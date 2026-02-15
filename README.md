# 🏛️ Heritage Explorer AI

An interactive web application that brings India's rich heritage, culture, and biodiversity to life through AI-powered conversations with culturally-informed characters.

## ✨ Features

- 🎭 **4 Unique AI Characters**: Dadi Amma, Prof. Arjun, Meera, and Kabir Das
- 🤖 **Gemini AI Integration**: Smart, context-aware responses powered by Google Generative AI
- 💬 **Floating Chatbot**: Always accessible widget with character selection
- 📚 **Heritage Knowledge**: Specialized information about:
  - Indian folklore and traditions
  - Historical facts and archaeological discoveries
  - Biodiversity and conservation
  - Tribal culture and indigenous wisdom
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive Design**: Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm (or bun)
- Google Gemini API Key (free from https://ai.google.dev)

### Frontend Setup

```bash
# 1. Clone and navigate
git clone <YOUR_GIT_URL>
cd heritage-explorer-ai

# 2. Install dependencies
npm install

# 3. Start frontend dev server
npm run dev
```

Frontend runs at: `http://localhost:8080`

### Backend Setup (Required for AI)

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Get your FREE Gemini API Key
# Visit: https://ai.google.dev/
# - Click "Get API Key" or "Get started in Google AI Studio"
# - Create a new API key (free tier - 15 requests/minute)
# - Copy the key

# 4. Configure environment
# Edit backend/.env and add:
# GEMINI_API_KEY=your_key_here
# PORT=3001

# 5. Start backend
npm run dev
```

Backend runs at: `http://localhost:3001`

### 🎯 Test the Chatbot

1. Open frontend at `http://localhost:8080`
2. Click the emoji button (bottom-right) to open floating chatbot
3. Select a character and start conversing!
4. Try these prompts:
   - "Tell me a story about Rajasthan"
   - "What is the Indus Valley Civilization?"
   - "Tell me about wildlife in Kerala"
   - "Explain tribal traditions of Chhattisgarh"

## 📁 Project Structure

```
heritage-explorer-ai/
├── src/                    # Frontend React + TypeScript
│   ├── components/
│   │   └── FloatingChatbot.tsx    # AI chatbot widget
│   ├── pages/
│   │   └── ChatbotPage.tsx        # Full chatbot interface
│   ├── data/
│   │   └── types.ts               # TypeScript interfaces
│   └── ...
├── backend/                # Node.js Express server
│   ├── server.ts           # Main API server with Gemini
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables (add key here)
│   └── README.md          # Backend documentation
├── package.json            # Frontend dependencies
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🤖 AI Characters

### 👵 Dadi Amma - Folk Storyteller (Rajasthan)
Shares Rajasthani folklore, traditions, cultural wisdom, and sacred practices with warmth and affection.

### 🧑‍🏫 Prof. Arjun - Historian (Delhi)
Provides scholarly insights on Indian history, archaeology, civilizations, and scientific contributions.

### 🌿 Meera - Wildlife Guide (Kerala)
Discusses biodiversity, endangered species, forest ecosystems, and conservation efforts.

### 🪶 Kabir Das - Tribal Elder (Chhattisgarh)
Shares tribal heritage, indigenous crafts, spiritual practices, and traditional knowledge.

## 🔑 Getting Your Gemini API Key

1. Visit https://ai.google.dev/
2. Click **"Get API Key"** button
3. Create new API key (free tier available)
4. Copy the key
5. Add to `backend/.env`:
   ```
   GEMINI_API_KEY=your_copied_key_here
   PORT=3001
   ```

The free tier includes:
- 15 requests per minute
- Unlimited requests per day
- Perfect for development and testing

## 🚀 Development

### Run Both Frontend & Backend

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Build for Production

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## 📦 Environment Variables

### Frontend
Create `.env` if needed:
```
VITE_BACKEND_URL=http://localhost:3001
```

### Backend (Required)
Edit `backend/.env`:
```
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

## 🐛 Troubleshooting

### "Backend not connecting" error
- Ensure backend is running: `npm run dev` in backend folder
- Check backend is at `http://localhost:3001`
- Verify `GEMINI_API_KEY` is set in `backend/.env`

### "GEMINI_API_KEY not set" in backend
- Open `backend/.env`
- Add your API key: `GEMINI_API_KEY=your_key_here`
- Restart backend: `npm run dev`

### Chatbot shows connection error
- Frontend should reach backend automatically
- If not, check both are running
- Look at browser console for detailed errors

### API Key issues
- Visit https://ai.google.dev/
- Ensure your API key is active

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)

## 🎨 UI/UX Components

Built with:
- **Shadcn/ui** - High-quality React components
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icons

## 📝 Notes

- The floating chatbot appears in the bottom-right corner on all pages
- Each character has specialized knowledge domain for authentic responses
- Conversation history is maintained for better context understanding
- All responses are powered by Google Gemini 1.5 Flash model
