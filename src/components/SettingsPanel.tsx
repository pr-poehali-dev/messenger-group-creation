import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPanel() {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold">Параметры</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-4">Профиль</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20 ring-2 ring-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="gradient-purple text-white text-2xl">Я</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="mb-2">
                  Изменить аватар
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG. Макс 5МБ</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Имя пользователя</Label>
                <Input id="username" placeholder="Ваше имя" defaultValue="Вы" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="status">Статус</Label>
                <Input id="status" placeholder="Ваш статус" defaultValue="В сети" className="mt-1.5" />
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Звуки уведомлений</p>
                  <p className="text-xs text-muted-foreground">Воспроизводить звук при новых сообщениях</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Уведомления на рабочем столе</p>
                  <p className="text-xs text-muted-foreground">Показывать всплывающие уведомления</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Упоминания</p>
                  <p className="text-xs text-muted-foreground">Уведомлять когда вас упоминают</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-4">Конфиденциальность</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Онлайн статус</p>
                  <p className="text-xs text-muted-foreground">Показывать когда вы в сети</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Статус набора</p>
                  <p className="text-xs text-muted-foreground">Показывать когда вы печатаете</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Чтение сообщений</p>
                  <p className="text-xs text-muted-foreground">Отправлять статус прочтения</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-4">Внешний вид</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Тема оформления</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg border-2 border-primary bg-sidebar text-left">
                    <Icon name="Moon" size={20} className="mb-2" />
                    <p className="font-medium text-sm">Тёмная</p>
                  </button>
                  <button className="p-4 rounded-lg border-2 border-transparent bg-muted text-left hover:border-primary transition-all">
                    <Icon name="Sun" size={20} className="mb-2" />
                    <p className="font-medium text-sm">Светлая</p>
                  </button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Анимации</p>
                  <p className="text-xs text-muted-foreground">Использовать анимации интерфейса</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border border-destructive/50">
            <h3 className="text-lg font-semibold mb-4 text-destructive">Опасная зона</h3>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти из аккаунта
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10">
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить аккаунт
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
