import { BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ChatHeader({ title = 'Heritage Explorer AI', subtitle = 'Discover India\'s Rich History' }: ChatHeaderProps) {
  return (
    <header className="p-4 border-b bg-card shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary">
            <BrainCircuit className="w-7 h-7 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
