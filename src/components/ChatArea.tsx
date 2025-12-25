import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

export default function ChatArea() {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: '1',
      author: 'Александр',
      avatar: '',
      content: 'Привет всем! Кто-нибудь видел новые фичи?',
      timestamp: '14:32',
    },
    {
      id: '2',
      author: 'Мария',
      avatar: '',
      content: 'Да, выглядит отлично! Особенно понравились голосовые звонки',
      timestamp: '14:35',
    },
    {
      id: '3',
      author: 'Вы',
      avatar: '',
      content: 'Спасибо! Рад что вам нравится 🚀',
      timestamp: '14:37',
      isOwn: true,
    },
    {
      id: '4',
      author: 'Дмитрий',
      avatar: '',
      content: 'А когда добавите стикеры?',
      timestamp: '14:40',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Hash" size={20} className="text-muted-foreground" />
          <h2 className="font-semibold text-lg">общий</h2>
          <Badge variant="secondary" className="text-xs">124 онлайн</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="gradient-blue text-white hover:opacity-90">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="gradient-purple text-white hover:opacity-90">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Search" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Users" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${msg.isOwn ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback className={msg.isOwn ? 'gradient-purple text-white' : 'bg-muted'}>
                  {msg.author[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex-1 ${msg.isOwn ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{msg.author}</span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-2xl ${
                    msg.isOwn
                      ? 'gradient-purple text-white'
                      : 'bg-card text-card-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Plus" size={20} />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Написать сообщение..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Smile" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Mic" size={20} />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="h-8 w-8 gradient-purple text-white hover:opacity-90"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
