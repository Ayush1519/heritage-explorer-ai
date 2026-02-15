import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Loader } from "lucide-react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-heritage text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-heritage text-white p-4">
              <h3 className="font-semibold">Heritage Explorer AI</h3>
              <p className="text-xs text-white/80">Ask about India's heritage & biodiversity</p>
            </div>

            {/* Chatbot Iframe */}
            <div className="flex-1 overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader className="w-6 h-6 text-primary animate-spin" />
                    <p className="text-xs text-muted-foreground">Loading chatbot...</p>
                  </div>
                </div>
              )}
              <iframe
                src="https://9000-firebase-studio-1771152836014.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev"
                className="w-full h-full border-none"
                title="Heritage Explorer Chatbot"
                allow="microphone; camera; geolocation; clipboard-read; clipboard-write"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                onLoad={handleIframeLoad}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
