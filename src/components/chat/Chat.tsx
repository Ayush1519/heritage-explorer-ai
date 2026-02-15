'use client';

import { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import type { Message } from './ChatMessage';

interface ChatProps {
  character?: string;
  initialGreeting?: string;
}

// Comprehensive knowledge base
const knowledgeBase: Record<string, Record<string, string>> = {
  heritage: {
    "taj mahal": "The Taj Mahal is an ivory-white marble mausoleum in Agra, built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. Completed in 1653, it's a UNESCO World Heritage Site and symbol of eternal love. It took 20 years and 20,000 artisans to complete.",
    "hampi": "Hampi is the ruins of the Vijayanagara Empire's capital in Karnataka. It has over 1,600 surviving remains of temples, palaces, and market streets. Capital from 1336-1646, it was once one of the richest cities in the world.",
    "khajuraho": "Khajuraho Temples in Madhya Pradesh are Hindu and Jain temples built 950-1050 CE by the Chandela dynasty. Famous for their nagara-style architecture and intricate sculptures. Originally 85 temples, 25 survive today.",
    "konark": "Konark Sun Temple in Odisha is a 13th-century masterpiece designed as a massive chariot of the Sun God. Built around 1250 CE by King Narasimhadeva I. Known as the 'Black Pagoda' by European sailors.",
    "sundarbans": "Sundarbans is the world's largest mangrove forest spanning India and Bangladesh. Home to the Royal Bengal Tiger and unique ecosystems where land meets sea. Also host to river dolphins and over 260 bird species.",
    "jaisalmer": "Jaisalmer Fort in Rajasthan, called the 'Golden Fort', is one of the world's largest fully preserved fortified cities. Built in 1156 CE by Rajput ruler Rawal Jaisal. Important stop on the ancient Silk Road.",
  },
  biodiversity: {
    "bengal tiger": "The Royal Bengal Tiger is the largest cat species in the world. Found in Sundarbans, they are uniquely adapted to swimming and living in mangrove forests. Conservation status: Endangered. Population has increased from 20 to over 600 due to conservation.",
    "peacock": "Indian Peafowl is India's national bird. Known for its spectacular iridescent tail display with over 200 feathers. Found across the Indian subcontinent. Conservation status: Least Concern.",
    "asiatic lion": "Asiatic Lion is found only in the Gir Forest of Gujarat. Once nearly extinct, conservation efforts increased their numbers from 20 to over 600. Very rare compared to African lions. Conservation status: Endangered.",
    "one-horned rhino": "Indian One-Horned Rhinoceros lives in Kaziranga National Park, Assam. World's largest population lives here. Protected by dedicated forest guards. Conservation status: Vulnerable.",
    "banyan tree": "Indian Banyan is India's national tree. The Great Banyan in Kolkata has the largest canopy in the world, spanning over 3.5 acres. Sacred in Hindu culture.",
    "lotus": "Sacred Lotus is India's national flower, symbol of purity and divine beauty. Grows in muddy waters but blooms immaculate. Used in religious ceremonies and traditional medicine.",
    "nilgiri tahr": "Nilgiri Tahr is an endangered mountain goat found only in the Nilgiri Hills and Western Ghats. Threatened by habitat loss. Conservation status: Endangered.",
    "snow leopard": "Snow Leopard, the 'Ghost of the Mountains', roams the high Himalayas. India is home to estimated 700 snow leopards. Conservation status: Vulnerable.",
  },
  culture: {
    "ashoka": "Emperor Ashoka transformed from a ruthless conqueror to a champion of peace after the Kalinga War. He adopted Buddhism and spread the message of Dhamma through rock edicts. His Ashoka Chakra appears on India's national flag.",
    "bishnoi": "Bishnoi community of Rajasthan is considered the world's first environmentalists. In 1730, Amrita Devi and 362 Bishnoi sacrificed their lives protecting trees. They follow 29 principles of ecology.",
    "chipko movement": "The Chipko Movement of the 1970s was inspired by the Bishnoi sacrifice. People, especially women, hugged trees to protect them from cutting. Became a symbol of non-violent environmental resistance.",
    "odissi dance": "Odissi dance originated in temples like Konark and developed in Odisha. One of India's classical dance forms. The Konark Dance Festival celebrates this art annually.",
    "gond art": "Gond art is one of India's oldest tribal art traditions from central India. Artists paint stories of the forest. Each piece depicts the connection between nature and spiritual beliefs.",
  },
};

const getResponse = (input: string): string => {
  const query = input.toLowerCase().trim();
  
  // Search through all categories
  for (const category in knowledgeBase) {
    for (const key in knowledgeBase[category]) {
      if (query.includes(key) || key.includes(query.split(' ')[0])) {
        return knowledgeBase[category][key];
      }
    }
  }

  // Smart responses for common queries
  if (query.includes('heritage') || query.includes('monument') || query.includes('temple')) {
    return 'I have information about Taj Mahal, Hampi, Khajuraho, Konark, Sundarbans, and Jaisalmer. Which heritage site interests you? 🏛️';
  }
  
  if (query.includes('animal') || query.includes('wildlife') || query.includes('tiger') || query.includes('bird')) {
    return 'I know about Bengal Tigers, Peacocks, Asiatic Lions, One-Horned Rhinos, Nilgiri Tahrs, and Snow Leopards. Which animal would you like to learn about? 🦁';
  }
  
  if (query.includes('tree') || query.includes('plant') || query.includes('flower')) {
    return 'I can tell you about Banyan Trees, Sacred Lotus, and various endangered plants. What interests you? 🌿';
  }
  
  if (query.includes('culture') || query.includes('tradition') || query.includes('dance') || query.includes('art')) {
    return 'I have information about Ashoka, Bishnoi community, Chipko Movement, Odissi dance, and Gond art. What would you like to know? 🎨';
  }

  if (query.includes('help') || query.includes('what can') || query.includes('tell me')) {
    return 'I can tell you about Indian Heritage Sites, Biodiversity & Wildlife, Cultural Traditions, and Environmental Movements. Try asking about Taj Mahal, Bengal Tigers, Sacred Lotus, or the Bishnoi community! 📚';
  }

  return '🤔 I\'m not sure about that. Ask me about Indian heritage sites, wildlife, plants, or cultural traditions. Try: "Tell me about Taj Mahal", "What is Bengal Tiger?", or "Explain Bishnoi community"';
};

export function Chat({ character = 'meera', initialGreeting }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const greeting = initialGreeting || "🌟 Welcome! I'm your Heritage & Biodiversity Expert. Ask me about Indian monuments, wildlife, plants, traditions, and more!";
    setMessages([
      {
        id: 'init',
        role: 'model',
        content: greeting,
      },
    ]);
  }, [initialGreeting, character]);

  const handleSendMessage = async (input: string) => {
    if (isLoading || !input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate response delay for natural feel
    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: response,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

