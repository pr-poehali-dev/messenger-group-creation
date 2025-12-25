import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userAvatar?: string;
  callType?: 'audio' | 'video';
}

export default function CallModal({ 
  isOpen, 
  onClose, 
  userName = 'Собеседник',
  userAvatar = '',
  callType = 'audio'
}: CallModalProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'audio');

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setDuration(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 w-full max-w-md text-white text-center shadow-2xl animate-scale-in">
        {callType === 'video' && !isVideoOff ? (
          <div className="mb-6 relative rounded-2xl overflow-hidden bg-gray-900 aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="text-4xl bg-purple-600">
                  {userName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
              <span className="text-sm">Вы</span>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-white/20">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="text-5xl bg-purple-600">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-2">{userName}</h2>
        <p className="text-lg text-white/80 mb-1">{callType === 'video' ? 'Видеозвонок' : 'Голосовой звонок'}</p>
        <p className="text-3xl font-mono mb-8">{formatDuration(duration)}</p>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            className={`h-14 w-14 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white'} hover:bg-white/30 border-0`}
            onClick={() => setIsMuted(!isMuted)}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
          </Button>

          {callType === 'video' && (
            <Button
              variant="outline"
              size="icon"
              className={`h-14 w-14 rounded-full ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white'} hover:bg-white/30 border-0`}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/20 text-white hover:bg-white/30 border-0"
          >
            <Icon name="Volume2" size={24} />
          </Button>
        </div>

        <Button
          onClick={onClose}
          size="lg"
          className="w-full bg-red-500 hover:bg-red-600 text-white h-14 rounded-full text-lg font-semibold"
        >
          <Icon name="PhoneOff" size={24} className="mr-2" />
          Завершить звонок
        </Button>
      </div>
    </div>
  );
}
