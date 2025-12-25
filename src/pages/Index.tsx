import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ServerList from '@/components/ServerList';
import ChatArea from '@/components/ChatArea';
import ContactsList from '@/components/ContactsList';
import NotificationsList from '@/components/NotificationsList';
import SettingsPanel from '@/components/SettingsPanel';
import PublicServers from '@/components/PublicServers';

type TabType = 'servers' | 'chats' | 'contacts' | 'notifications' | 'settings' | 'explore';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('servers');
  const [selectedChat, setSelectedChat] = useState({ id: 1, name: 'Общий чат' });

  const handleChannelSelect = (channelId: string, channelName: string) => {
    setSelectedChat({ id: parseInt(channelId), name: channelName });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'servers':
        return (
          <>
            <ServerList onChannelSelect={handleChannelSelect} />
            <ChatArea chatId={selectedChat.id} chatName={selectedChat.name} />
          </>
        );
      case 'chats':
        return <ChatArea chatId={selectedChat.id} chatName={selectedChat.name} />;
      case 'contacts':
        return <ContactsList />;
      case 'notifications':
        return <NotificationsList />;
      case 'settings':
        return <SettingsPanel />;
      case 'explore':
        return <PublicServers />;
      default:
        return <ChatArea chatId={selectedChat.id} chatName={selectedChat.name} />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
