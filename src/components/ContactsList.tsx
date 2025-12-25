import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar: string;
  lastMessage?: string;
}

export default function ContactsList() {
  const contacts: Contact[] = [
    { id: '1', name: 'Александр Петров', status: 'online', avatar: '', lastMessage: 'Отличная идея!' },
    { id: '2', name: 'Мария Иванова', status: 'online', avatar: '' },
    { id: '3', name: 'Дмитрий Сидоров', status: 'away', avatar: '', lastMessage: 'Сейчас не могу' },
    { id: '4', name: 'Елена Козлова', status: 'offline', avatar: '' },
    { id: '5', name: 'Игорь Волков', status: 'online', avatar: '', lastMessage: 'Посмотрел, круто!' },
    { id: '6', name: 'Анна Морозова', status: 'offline', avatar: '' },
    { id: '7', name: 'Сергей Новиков', status: 'online', avatar: '' },
  ];

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
  };

  const onlineCount = contacts.filter((c) => c.status === 'online').length;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Контакты</h2>
          <Button size="icon" className="gradient-purple text-white hover:opacity-90">
            <Icon name="UserPlus" size={20} />
          </Button>
        </div>
        
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск контактов..."
            className="pl-10 bg-card border-0"
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary" className="text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            {onlineCount} онлайн
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {contacts.length} всего
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-all group animate-fade-in"
            >
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {contact.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${statusColors[contact.status]} border-2 border-background rounded-full`}></div>
              </div>

              <div className="flex-1 text-left">
                <p className="font-semibold text-sm">{contact.name}</p>
                {contact.lastMessage ? (
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                ) : (
                  <p className="text-xs text-muted-foreground capitalize">{contact.status === 'online' ? 'В сети' : contact.status === 'away' ? 'Отошёл' : 'Не в сети'}</p>
                )}
              </div>

              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity gradient-blue text-white hover:opacity-90">
                  <Icon name="Phone" size={16} />
                </Button>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
