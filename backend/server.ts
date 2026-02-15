import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "" ;
const MONGO_URI = process.env.MONGO_URI;

if (!GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY not set in .env file");
  process.exit(1);
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// MongoDB Connection
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, {
      retryWrites: true,
      w: "majority",
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// Contribution Schema
const contributionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["story", "tradition", "observation", "photo"], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    region: { type: String, required: true },
    category: { type: String, enum: ["culture", "biodiversity"], required: true },
    contributorName: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contribution = mongoose.model("Contribution", contributionSchema);

// Middleware
app.use(cors());
app.use(express.json());

// System prompt for each character
const characterPrompts: Record<string, string> = {
  dadi: `You are Dadi Amma, a 75-year-old folk storyteller from Rajasthan. You share stories, traditions, and cultural wisdom from Rajasthan with warmth and affection. 
You speak with a grandmotherly tone, often use terms like "beta," "Namaste," and "bhagwan." 
You are knowledgeable about:
- Rajasthani folk tales and legends
- Traditional customs and festivals
- Folk art and crafts (Rajasthani painting, Bandhani, Chanudaro)
- Sacred traditions and spiritual practices
- Historical figures like Pabuji and Goga Pir
Answer questions about these topics with personal anecdotes and traditional wisdom.
Keep responses warm, engaging, and educational.
When you mention specific facts, include relevant emojis to make it more engaging.`,

  arjun: `You are Professor Arjun, a 50-year-old historian from Delhi. You are an academic expert in Indian history, archaeology, and civilization.
You are knowledgeable about:
- Ancient Indian civilizations (Indus Valley, Vedic period, Maurya, Gupta empires)
- Historical figures and their contributions
- Archaeological discoveries and historical sites
- India's scientific and mathematical contributions to the world
- Constitutional history and modern India
You present historical facts with academic rigor, include dates, archaeological evidence, and cross-references.
You encourage critical thinking and provide context for historical events.
Keep responses scholarly but accessible, with occasional anecdotes from your research travels.
Use relevant emojis to highlight key concepts.`,

  meera: `You are Meera, a wildlife guide and conservationist from Kerala. You are passionate about biodiversity and ecological conservation.
You are knowledgeable about:
- Indian wildlife and endangered species
- Biodiversity hotspots (Western Ghats, Sundarbans, Eastern Himalayas, etc.)
- Forest ecosystems and their importance
- Conservation efforts and sacred groves
- Traditional ecological knowledge and sustainable practices
You speak with enthusiasm about nature, share facts about animals and plants, and advocate for conservation.
You mention specific regions, species, and conservation projects.
Keep responses educational, inspiring, and action-oriented.
Use nature-related emojis to enhance your message.`,

  kabir: `You are Kabir Das, an 80-year-old tribal elder from Chhattisgarh. You represent the indigenous tribal heritage and wisdom.
You are knowledgeable about:
- Tribal traditions, customs, and festivals
- Traditional crafts (Dhokra, Gond art, bamboo work)
- Sacred forests and spiritual practices
- Tribal history and cultural identity
- Migration patterns, tribal communities (Gond, Bastar tribes)
- Connection between tribal communities and nature
You speak with respect for tradition and deep connection to the land.
You share wisdom from generations of tribal knowledge.
You emphasize harmony with nature and community values.
Sometimes reference tribal festivals, spiritual ceremonies, and traditional practices.
Use cultural emojis to enhance storytelling.`,
};

interface ChatRequest {
  message: string;
  character: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

interface ChatResponse {
  content: string;
  character: string;
}

// Chat endpoint
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { message, character, conversationHistory = [] } = req.body as ChatRequest;

    if (!message || !character) {
      res.status(400).json({ error: "Missing message or character" });
      return;
    }

    const characterPrompt = characterPrompts[character] || characterPrompts.dadi;

    // Build conversation history for the model
    const history = conversationHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add the current message
    const userMessage = {
      role: "user",
      parts: [{ text: message }],
    };

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: characterPrompt,
    });

    // Generate response
    const response = await model.generateContent({
      contents: [...history, userMessage],
    });

    const responseText =
      response.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I couldn't generate a response at this moment.";

    res.json({
      content: responseText,
      character: character,
    } as ChatResponse);
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Contribution endpoints
// POST - Create new contribution
app.post("/api/contributions", async (req: express.Request, res: express.Response) => {
  try {
    const { type, title, content, region, category, contributorName } = req.body;

    // Validation
    if (!type || !title || !content || !region || !category || !contributorName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const contribution = new Contribution({
      type,
      title,
      content,
      region,
      category,
      contributorName,
      status: "pending",
    });

    await contribution.save();

    res.status(201).json({
      success: true,
      message: "Contribution submitted successfully",
      contribution: contribution,
    });
  } catch (error) {
    console.error("Error creating contribution:", error);
    res.status(500).json({
      error: "Failed to create contribution",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET - Fetch all contributions (any status)
app.get("/api/contributions", async (req: express.Request, res: express.Response) => {
  try {
    // Allow optional status filter via query param: ?status=pending|approved|rejected|all
    const status = (req.query.status as string) || "all";

    let filter: Record<string, any> = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    console.log(`📥 Fetching contributions (status=${status})`);

    const contributions = await Contribution.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    console.log(`✅ Found ${contributions.length} contributions`);

    res.json({
      success: true,
      contributions: contributions,
    });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({
      error: "Failed to fetch contributions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET - Fetch pending contributions (for moderation)
app.get("/api/contributions/pending", async (req: express.Request, res: express.Response) => {
  try {
    const contributions = await Contribution.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      contributions: contributions,
    });
  } catch (error) {
    console.error("Error fetching pending contributions:", error);
    res.status(500).json({
      error: "Failed to fetch pending contributions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Debug endpoint: counts by status
app.get("/api/contributions/debug/counts", async (req: express.Request, res: express.Response) => {
  try {
    const total = await Contribution.countDocuments({});
    const pending = await Contribution.countDocuments({ status: "pending" });
    const approved = await Contribution.countDocuments({ status: "approved" });
    const rejected = await Contribution.countDocuments({ status: "rejected" });

    res.json({ success: true, counts: { total, pending, approved, rejected } });
  } catch (error) {
    console.error("Error fetching contribution counts:", error);
    res.status(500).json({ success: false, error: "Failed to fetch counts" });
  }
});

// PUT - Update contribution status (for moderation)
app.put("/api/contributions/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    const updated = await Contribution.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: "Contribution not found" });
      return;
    }

    res.json({
      success: true,
      message: "Contribution status updated",
      contribution: updated,
    });
  } catch (error) {
    console.error("Error updating contribution:", error);
    res.status(500).json({
      error: "Failed to update contribution",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.json({ status: "ok", message: "Heritage Explorer API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Heritage Explorer API running on http://localhost:${PORT}`);
  console.log(`📚 Gemini AI Characters ready for interaction`);
});
