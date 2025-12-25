import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ServerList from '@/components/ServerList';
import ChatArea from '@/components/ChatArea';
import ContactsList from '@/components/ContactsList';
import NotificationsList from '@/components/NotificationsList';
import SettingsPanel from '@/components/SettingsPanel';

type TabType = 'servers' | 'chats' | 'contacts' | 'notifications' | 'settings';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('servers');

  const renderContent = () => {
    switch (activeTab) {
      case 'servers':
        return (
          <>
            <ServerList />
            <ChatArea />
          </>
        );
      case 'chats':
        return <ChatArea />;
      case 'contacts':
        return <ContactsList />;
      case 'notifications':
        return <NotificationsList />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
