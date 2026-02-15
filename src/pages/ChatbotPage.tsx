import { useState } from "react";
import { motion } from "framer-motion";
import { Chat } from "@/components/chat/Chat";

const characters = [
  { id: "dadi", name: "Dadi Amma", role: "Folk Storyteller", region: "Rajasthan", emoji: "👵", color: "bg-terracotta", greeting: "Namaste, beta! I am Dadi Amma. Ask me anything about Rajasthan's rich heritage and traditions! 🌟" },
  { id: "arjun", name: "Prof. Arjun", role: "Historian", region: "Delhi", emoji: "🧑‍🏫", color: "bg-primary", greeting: "Greetings! I am Professor Arjun. Let's explore the fascinating depths of Indian history together! 📚" },
  { id: "meera", name: "Meera", role: "Wildlife Guide", region: "Kerala", emoji: "🌿", color: "bg-forest", greeting: "Namaste! I'm Meera. Let's discover the incredible biodiversity and natural wonders of India! 🌿" },
  { id: "kabir", name: "Kabir Das", role: "Tribal Elder", region: "Chhattisgarh", emoji: "🪶", color: "bg-teal", greeting: "Welcome! I am Kabir Das. Come, explore the tribal heritage and wisdom of Central India! 🪶" },
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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Character Selection Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/40"
      >
        <div className="container mx-auto px-4 py-3">
          <p className="text-xs text-muted-foreground mb-3 font-medium">Select a Character:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {characters.map((c) => (
              <motion.button
                key={c.id}
                onClick={() => setSelectedChar(c)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedChar.id === c.id
                    ? `${c.color} border-primary text-primary-foreground shadow-lg`
                    : "border-border bg-background hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="text-xl">{c.emoji}</span>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold">{c.name}</p>
                  <p className="text-xs opacity-70">{c.role}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chat Component */}
      <motion.div
        key={selectedChar.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-hidden"
      >
        <Chat character={selectedChar.id} initialGreeting={selectedChar.greeting} />
      </motion.div>
    </div>
  );
}
