import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, User } from "lucide-react";
import { ChatMessage } from "@/data/types";

const characters = [
  { id: "dadi", name: "Dadi Amma", role: "Folk Storyteller", region: "Rajasthan", emoji: "👵", color: "bg-terracotta" },
  { id: "arjun", name: "Prof. Arjun", role: "Historian", region: "Delhi", emoji: "🧑‍🏫", color: "bg-primary" },
  { id: "meera", name: "Meera", role: "Wildlife Guide", region: "Kerala", emoji: "🌿", color: "bg-forest" },
  { id: "kabir", name: "Kabir Das", role: "Tribal Elder", region: "Chhattisgarh", emoji: "🪶", color: "bg-teal" },
];

const sampleResponses: Record<string, string[]> = {
  dadi: [
    "Namaste, beta! Let me tell you a story from the golden sands of Rajasthan... Did you know the Bishnoi community has been protecting trees for over 500 years? They are the world's first environmentalists! 🌳",
    "Ah, wonderful question! The Rajasthani tradition of 'Pabuji Ki Phad' is a painted scroll storytelling tradition that has been passed down for centuries. Bards travel from village to village, unrolling these magnificent scrolls while singing epic tales. 🎨",
    "In our culture, every festival tells a story. Gangaur celebrates the devotion of Goddess Parvati, and young girls carry beautifully decorated clay idols through the streets. It's a sight to behold! ✨",
  ],
  arjun: [
    "Excellent question! The Indus Valley Civilization, dating back to 3300 BCE, was remarkably advanced. They had sophisticated drainage systems, standardized weights, and even dental surgery! Cities like Mohenjo-daro and Harappa were marvels of urban planning. 🏛️",
    "The Maurya Empire under Ashoka was transformative. After the Kalinga War, Ashoka embraced Buddhism and spread the message of Dhamma through rock edicts across the subcontinent. His Ashoka Chakra adorns our national flag today. ☸️",
    "India's contribution to mathematics is profound. Aryabhata calculated π to four decimal places, and the concept of zero — which changed the world — originated here. We gave the world the decimal system! 🔢",
  ],
  meera: [
    "Welcome to the Western Ghats! 🌿 This is one of the world's 36 biodiversity hotspots. We have over 325 globally threatened species here, including the lion-tailed macaque and Nilgiri tahr. The monsoon clouds create a magical misty landscape!",
    "Did you know India has 5 types of forests? From the mangroves of Sundarbans to the alpine meadows of the Himalayas. The Sundarbans alone are home to the famous swimming tigers of Bengal! 🐅",
    "The sacred groves of India — called 'Dev Vans' — are patches of forest preserved by local communities for centuries as abodes of deities. This traditional conservation practice has saved countless species! 🌳",
  ],
  kabir: [
    "In our Bastar region, the Dhokra metal craft has been practiced for over 4,000 years using the lost-wax technique. Each piece tells a story of our connection with nature and the spirits of the forest. 🎭",
    "The Gond art tradition is one of India's oldest. We paint stories of the forest — every tree, every animal has a spirit. Our art has now reached galleries worldwide, but its roots remain in the sacred forests of central India. 🎨",
    "Our tribal festivals follow the rhythm of nature. The Madai festival brings together different tribal communities to trade, celebrate, and share stories. Music and dance connect us to our ancestors. 🪘",
  ],
};

export default function ChatbotPage() {
  const [selectedChar, setSelectedChar] = useState(characters[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const responses = sampleResponses[selectedChar.id] || sampleResponses.dadi;
    const response = responses[Math.floor(Math.random() * responses.length)];

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">AI Cultural Guide</h1>
          <p className="text-muted-foreground mb-6">Chat with AI characters who bring India's heritage to life</p>
        </motion.div>

        {/* Character selection */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedChar(c); setMessages([]); }}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                selectedChar.id === c.id ? "border-primary bg-primary/10 shadow-heritage" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <div className="text-left">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.role} • {c.region}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className={`${selectedChar.color} p-4 flex items-center gap-3`}>
            <span className="text-3xl">{selectedChar.emoji}</span>
            <div>
              <p className="font-semibold text-primary-foreground">{selectedChar.name}</p>
              <p className="text-xs text-primary-foreground/80">{selectedChar.role} from {selectedChar.region}</p>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Ask {selectedChar.name} anything about Indian heritage!</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {["Tell me a story", "Interesting facts?", "Local traditions?"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => { setInput(suggestion); }}
                      className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-full hover:bg-primary/10 hover:text-primary transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && <span className="text-2xl flex-shrink-0 mt-1">{selectedChar.emoji}</span>}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Ask ${selectedChar.name}...`}
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="px-4 py-3 bg-gradient-heritage text-primary-foreground rounded-xl disabled:opacity-50 hover:shadow-heritage transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💡 This is a demo with sample responses. Connect to AI for intelligent conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
