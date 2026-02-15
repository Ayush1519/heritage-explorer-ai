'use client';

import { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import type { Message } from './ChatMessage';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface ChatProps {
  character?: string;
  initialGreeting?: string;
}

export function Chat({ character = 'meera', initialGreeting }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const greeting = initialGreeting || "Hello! I'm your Heritage Explorer AI guide. Ask me anything about Indian history, culture, or biodiversity!";
    setMessages([
      {
        id: 'init',
        role: 'model',
        content: greeting,
      },
    ]);
  }, [initialGreeting, character]);

  const handleSendMessage = async (input: string) => {
    if (isLoading) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Filter out the initial greeting message from the history
    const history = newMessages
      .filter((m) => m.id !== 'init')
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          character: character,
          conversationHistory: history.slice(0, -1),
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: data.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: '⚠️ Sorry, I encountered an error. Please ensure the backend server is running at ' + BACKEND_URL,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
