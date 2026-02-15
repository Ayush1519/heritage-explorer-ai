# Heritage Explorer Backend - Gemini-Powered API

A Node.js/Express backend server that powers the Heritage Explorer AI chatbot with context-aware Gemini responses.

## Features

- 🤖 **Gemini AI Integration**: Uses Google Generative AI for intelligent, context-aware responses
- 🎭 **Character-Based System**: 4 unique AI characters with specialized knowledge domains
- 💬 **Conversation History**: Maintains context across multiple messages
- 🔌 **REST API**: Simple POST endpoint for chat interactions
- ⚡ **Fast & Lightweight**: Built with Express.js

## Characters

1. **Dadi Amma** (👵) - Folk Storyteller from Rajasthan
2. **Prof. Arjun** (🧑‍🏫) - Historian from Delhi
3. **Meera** (🌿) - Wildlife Guide from Kerala
4. **Kabir Das** (🪶) - Tribal Elder from Chhattisgarh

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/bun
- Google Gemini API Key (free from https://ai.google.dev)

### 🚀 Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   # or if using bun:
   bun install
   ```

2. **Configure Environment**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

3. **Add Your Gemini API Key**
   - Go to https://ai.google.dev/
   - Create a free API key
   - Open `.env` and add your key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```

### ▶️ Running the Server

**Development Mode** (with hot reload):
```bash
npm run dev
```

**Production Mode** (build first):
```bash
npm run build
npm start
```

The server will start at `http://localhost:3001`

## API Endpoint

### POST `/api/chat`

Send a message and get a response from the selected AI character.

**Request:**
```json
{
  "message": "Tell me a story about Rajasthan",
  "character": "dadi",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Namaste, beta!"
    }
  ]
}
```

**Response:**
```json
{
  "content": "Namaste, beta! Let me tell you a story from the golden sands of Rajasthan...",
  "character": "dadi"
}
```

**Parameters:**
- `message` (string, required): User's question/message
- `character` (string, required): Character ID ("dadi", "arjun", "meera", or "kabir")
- `conversationHistory` (array, optional): Previous messages for context

**Character IDs:**
- `dadi` - Dadi Amma, Folk Storyteller
- `arjun` - Prof. Arjun, Historian
- `meera` - Meera, Wildlife Guide
- `kabir` - Kabir Das, Tribal Elder

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Heritage Explorer API is running"
}
```

## Connecting Frontend

The frontend should be configured to use this backend:

1. **For Development:**
   - Frontend: `http://localhost:8080`
   - Backend: `http://localhost:3001`
   - Add to frontend `.env`:
     ```
     VITE_BACKEND_URL=http://localhost:3001
     ```

2. **For Production:**
   - Update `VITE_BACKEND_URL` to your production backend URL

## Troubleshooting

### "GEMINI_API_KEY not set"
- Ensure `.env` file exists in the backend directory
- Check that `GEMINI_API_KEY` is properly set
- Never commit `.env` file to git

### "Cannot find module" errors
- Run `npm install` to install all dependencies
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### CORS errors
- The server already has CORS enabled for all origins
- If you still see CORS issues, check browser console for actual error

### Backend not connecting from frontend
- Verify backend is running: `curl http://localhost:3001/api/health`
- Check that `VITE_BACKEND_URL` is correctly set in frontend
- Ensure both frontend and backend are running

## Development

### Project Structure
```
backend/
├── server.ts          # Main server file with API routes
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── .env              # Environment variables (not in git)
├── .env.example      # Example environment variables
└── .gitignore        # Git ignore rules
```

### System Prompts

Each character has a detailed system prompt defining their personality, knowledge domain, and communication style. These are defined in `server.ts` in the `characterPrompts` object.

## Performance Tips

- Enable conversation history to maintain context (improves relevance)
- The Gemini 1.5 Flash model is used for fast responses
- Server-side caching can be added for common questions
- Consider rate limiting for production

## License

Part of Heritage Explorer AI project
