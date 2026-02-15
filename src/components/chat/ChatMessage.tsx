import { BrainCircuit, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-end gap-3', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <BrainCircuit className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'p-3 rounded-xl max-w-[85%] sm:max-w-[70%] break-words shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
