import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { ChatMessage } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const character = {
  id: "meera",
  name: "Meera",
  role: "Heritage Guide",
  emoji: "🌿",
  color: "bg-forest",
};

const sampleResponses = [
  "That's a wonderful question! Let me share something from India's rich heritage... 🏛️",
  "I'm delighted you asked! Did you know that India has such incredible diversity and stories? 🌍",
  "What a fascinating topic! Let me tell you about India's cultural treasures... ✨",
  "Great question! There's so much to explore about Indian heritage and biodiversity. 🌿",
  "I love this question! Here's something interesting about India's traditions and nature... 🎭",
  "You're curious - I appreciate that! Let me share an interesting fact about India's heritage... 📚",
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageText = input;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Primary: OwnThink free chatbot API
      const ownThinkUrl = `https://api.ownthink.com/bot?spoken=${encodeURIComponent(messageText)}`;
      let reply = "";

      try {
        const r1 = await fetch(ownThinkUrl);
        if (r1.ok) {
          const d1 = await r1.json();
          // shape: { message: 'success', data: { info: { text: '...' } } }
          reply = d1?.data?.info?.text || d1?.message || "";
        }
      } catch (e) {
        // ignore and try fallback
        console.warn("OwnThink request failed", e);
      }

      // Fallback: affiliateplus free chatbot
      if (!reply) {
        const affiliateUrl = `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
          messageText
        )}&botname=Virasat&ownername=Virasat&lang=en`;
        try {
          const r2 = await fetch(affiliateUrl);
          if (r2.ok) {
            const d2 = await r2.json();
            reply = d2?.message || d2?.response || "";
          }
        } catch (e) {
          console.warn("Affiliate API failed", e);
        }
      }

      // Final fallback: client-side sample
      if (!reply) reply = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallback = "Sorry — I can't reach the chat service right now. Try again later.";
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallback,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      console.error("Chatbot error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Avatar Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-forest shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-3xl hover:scale-110"
      >
        {character.emoji}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className={`${character.color} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{character.emoji}</span>
                <div className="text-left">
                  <p className="font-semibold text-primary-foreground text-sm">{character.name}</p>
                  <p className="text-xs text-primary-foreground/80">{character.role}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm mt-6">
                  <p className="font-semibold mb-2">Hello! 👋</p>
                  <p>Ask me anything about India's heritage, culture, or biodiversity!</p>
                </div>
              )}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-background border-t border-border flex gap-2">
              <Input
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 text-sm h-9"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="px-3 h-9 bg-gradient-forest hover:opacity-90"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
