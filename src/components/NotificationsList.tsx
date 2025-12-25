import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'message' | 'call' | 'mention' | 'invite';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  avatar?: string;
}

export default function NotificationsList() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'message',
      title: 'Новое сообщение от Александра',
      description: 'Привет! Посмотри новый дизайн',
      time: '5 мин назад',
      isRead: false,
      avatar: '',
    },
    {
      id: '2',
      type: 'call',
      title: 'Пропущенный звонок',
      description: 'Мария звонила вам',
      time: '12 мин назад',
      isRead: false,
    },
    {
      id: '3',
      type: 'mention',
      title: 'Вас упомянули',
      description: 'Дмитрий упомянул вас в #frontend',
      time: '1 час назад',
      isRead: false,
    },
    {
      id: '4',
      type: 'invite',
      title: 'Приглашение на сервер',
      description: 'Елена пригласила вас на "Дизайн команда"',
      time: '2 часа назад',
      isRead: true,
    },
    {
      id: '5',
      type: 'message',
      title: 'Новое сообщение от Игоря',
      description: 'Отлично сработано! 👍',
      time: '3 часа назад',
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const typeIcons = {
    message: 'MessageCircle',
    call: 'Phone',
    mention: 'AtSign',
    invite: 'Mail',
  };

  const typeColors = {
    message: 'text-blue-500',
    call: 'text-green-500',
    mention: 'text-purple-500',
    invite: 'text-pink-500',
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Уведомления</h2>
            {unreadCount > 0 && (
              <Badge className="gradient-purple text-white">
                {unreadCount} новых
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Icon name="Check" size={16} className="mr-2" />
            Прочитать всё
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl transition-all hover:bg-card group cursor-pointer animate-fade-in ${
                !notification.isRead ? 'bg-card border-l-4 border-primary' : 'border-l-4 border-transparent'
              }`}
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${typeColors[notification.type]}`}>
                  <Icon name={typeIcons[notification.type]} size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  
                  {notification.type === 'invite' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="gradient-purple text-white hover:opacity-90">
                        Принять
                      </Button>
                      <Button size="sm" variant="outline">
                        Отклонить
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Icon name="Bell" size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Нет уведомлений</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
