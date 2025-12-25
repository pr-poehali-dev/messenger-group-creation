import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type TabType = 'servers' | 'chats' | 'contacts' | 'notifications' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: 'servers' as TabType, icon: 'LayoutGrid', label: 'Серверы', badge: null },
    { id: 'chats' as TabType, icon: 'MessageCircle', label: 'Чаты', badge: 3 },
    { id: 'contacts' as TabType, icon: 'Users', label: 'Контакты', badge: null },
    { id: 'notifications' as TabType, icon: 'Bell', label: 'Уведомления', badge: 5 },
    { id: 'settings' as TabType, icon: 'Settings', label: 'Параметры', badge: null },
  ];

  return (
    <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
      <div className="mb-4 relative group cursor-pointer">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20 hover:ring-primary transition-all">
          <AvatarImage src="" />
          <AvatarFallback className="gradient-purple text-white font-semibold">Я</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-sidebar rounded-full"></div>
      </div>

      <div className="flex-1 flex flex-col gap-2 w-full px-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="icon"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'w-full h-14 relative rounded-xl transition-all hover:bg-sidebar-accent',
              activeTab === tab.id ? 'bg-sidebar-accent text-primary' : 'text-muted-foreground'
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <Icon name={tab.icon} size={24} />
              {tab.badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-[10px]">
                  {tab.badge}
                </Badge>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
