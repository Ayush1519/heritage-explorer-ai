'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, LoaderCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <footer className="p-4 border-t bg-card">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Indian heritage..."
          disabled={isLoading}
          className="pr-12 h-11"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {isLoading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </form>
      <p className="text-xs text-center text-muted-foreground mt-2">
        Powered by AI - Check important information carefully
      </p>
    </footer>
  );
}
