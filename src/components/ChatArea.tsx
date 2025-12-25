import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  username: string;
  avatar: string;
}

interface ChatAreaProps {
  chatId?: number;
  chatName?: string;
}

const API_URL = 'https://functions.poehali.dev/65b1303d-b84b-41b8-b02f-1624ee401be5';

export default function ChatArea({ chatId = 1, chatName = 'Общий чат' }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    try {
      const response = await fetch(`${API_URL}?chat_id=${chatId}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [chatId]);

  const handleSend = async () => {
    if (message.trim() && !loading) {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            content: message.trim(),
            user_id: 1,
          }),
        });

        if (response.ok) {
          const newMessage = await response.json();
          setMessages([...messages, newMessage]);
          setMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Hash" size={20} className="text-muted-foreground" />
          <h2 className="font-semibold text-lg">{chatName}</h2>
          <Badge variant="secondary" className="text-xs">онлайн</Badge>
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
          {messages.map((msg) => {
            const isOwn = msg.username === 'Вы';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-in ${isOwn ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback className={isOwn ? 'gradient-purple text-white' : 'bg-muted'}>
                    {msg.username[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.username}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      isOwn
                        ? 'gradient-purple text-white'
                        : 'bg-card text-card-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
            disabled={loading}
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
            disabled={loading}
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
