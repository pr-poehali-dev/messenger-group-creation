import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PublicServer {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  category: string;
  avatar: string;
}

const PUBLIC_SERVERS: PublicServer[] = [
  {
    id: '1',
    name: 'Путешественники России',
    description: 'Обсуждаем красивые места нашей страны',
    members: 12543,
    online: 834,
    category: 'Путешествия',
    avatar: '🗺️'
  },
  {
    id: '2',
    name: 'Фотографы-любители',
    description: 'Делимся фото из поездок',
    members: 8234,
    online: 512,
    category: 'Творчество',
    avatar: '📸'
  },
  {
    id: '3',
    name: 'Горные походы',
    description: 'Треккинг, альпинизм, горы',
    members: 5621,
    online: 289,
    category: 'Спорт',
    avatar: '⛰️'
  },
  {
    id: '4',
    name: 'Морские путешествия',
    description: 'Яхтинг, дайвинг, пляжи',
    members: 9876,
    online: 634,
    category: 'Путешествия',
    avatar: '⛵'
  },
  {
    id: '5',
    name: 'Автопутешественники',
    description: 'Road trip по всему миру',
    members: 7453,
    online: 421,
    category: 'Путешествия',
    avatar: '🚗'
  },
  {
    id: '6',
    name: 'Кулинарный туризм',
    description: 'Еда и рестораны разных стран',
    members: 6789,
    online: 345,
    category: 'Еда',
    avatar: '🍜'
  }
];

export default function PublicServers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Путешествия', 'Творчество', 'Спорт', 'Еда'];

  const filteredServers = PUBLIC_SERVERS.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         server.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || server.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">🌍 Путешествия по серверам</h1>
            <p className="text-sm text-muted-foreground">Находите интересные сообщества со всего мира</p>
          </div>
        </div>

        <div className="relative mb-4">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск серверов..."
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer hover-scale"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServers.map((server) => (
            <div
              key={server.id}
              className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow duration-200 animate-fade-in"
            >
              <div className="flex gap-4">
                <Avatar className="w-16 h-16 text-3xl">
                  <AvatarFallback className="gradient-purple text-white text-3xl">
                    {server.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{server.name}</h3>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {server.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{server.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={14} />
                        {server.members.toLocaleString()} участников
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        {server.online} онлайн
                      </span>
                    </div>

                    <Button size="sm" className="gradient-purple text-white hover:opacity-90">
                      Присоединиться
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
