'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage, type Message } from './ChatMessage';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BrainCircuit } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

function LoadingMessage() {
  return (
    <div className="flex items-end gap-3">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <BrainCircuit className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="p-3 bg-card rounded-xl rounded-bl-none flex items-center space-x-1 shadow-sm">
        <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-pulse"></span>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
      <div className="p-4 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
      </div>
    </div>
  );
}
