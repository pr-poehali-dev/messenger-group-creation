import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

export default function ServerList() {
  const [selectedServer, setSelectedServer] = useState<string>('1');
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [newServerName, setNewServerName] = useState('');

  const servers: Server[] = [
    {
      id: '1',
      name: 'Главный сервер',
      icon: '🚀',
      channels: [
        { id: '1', name: 'общий', type: 'text', unread: 3 },
        { id: '2', name: 'мемы', type: 'text' },
        { id: '3', name: 'голосовая', type: 'voice' },
        { id: '4', name: 'помощь', type: 'text' },
      ],
    },
    {
      id: '2',
      name: 'Разработка',
      icon: '💻',
      channels: [
        { id: '5', name: 'frontend', type: 'text' },
        { id: '6', name: 'backend', type: 'text' },
        { id: '7', name: 'дизайн', type: 'text' },
      ],
    },
    {
      id: '3',
      name: 'Игры',
      icon: '🎮',
      channels: [
        { id: '8', name: 'новости', type: 'text' },
        { id: '9', name: 'поиск команды', type: 'text' },
      ],
    },
  ];

  const currentServer = servers.find((s) => s.id === selectedServer);

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="h-16 border-b border-border px-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg truncate">{currentServer?.name}</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Icon name="ChevronDown" size={16} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Серверы</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Icon name="Plus" size={14} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Создать сервер</DialogTitle>
                    <DialogDescription>
                      Введите название для нового сервера
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Название сервера"
                    value={newServerName}
                    onChange={(e) => setNewServerName(e.target.value)}
                  />
                  <Button className="w-full gradient-purple">Создать сервер</Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-1">
              {servers.map((server) => (
                <button
                  key={server.id}
                  onClick={() => setSelectedServer(server.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-muted',
                    selectedServer === server.id ? 'bg-muted' : ''
                  )}
                >
                  <div className="text-2xl">{server.icon}</div>
                  <span className="font-medium text-sm flex-1 text-left truncate">
                    {server.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Каналы</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Icon name="Plus" size={14} />
              </Button>
            </div>

            <div className="space-y-1">
              {currentServer?.channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-muted group',
                    selectedChannel === channel.id ? 'bg-muted text-primary' : 'text-muted-foreground'
                  )}
                >
                  <Icon name={channel.type === 'voice' ? 'Volume2' : 'Hash'} size={16} />
                  <span className="text-sm flex-1 text-left">{channel.name}</span>
                  {channel.unread && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
