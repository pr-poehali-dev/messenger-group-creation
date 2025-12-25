import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STICKER_CATEGORIES = {
  emotions: ['😊', '😂', '😍', '🥰', '😎', '🤔', '😴', '🥳', '😤', '😭', '🤗', '😇'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
  gestures: ['👍', '👎', '👌', '✌️', '🤞', '🤘', '👏', '🙌', '🤝', '🙏', '💪', '✋'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💖'],
  celebration: ['🎉', '🎊', '🎈', '🎁', '🎂', '🎆', '🎇', '✨', '🎀', '🎗️', '🏆', '🥇'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧃', '☕', '🍦', '🍰', '🍪', '🍩', '🍫']
};

interface StickerPickerProps {
  onSelect: (sticker: string) => void;
  onClose: () => void;
}

export default function StickerPicker({ onSelect, onClose }: StickerPickerProps) {
  const [activeTab, setActiveTab] = useState('emotions');

  return (
    <div className="absolute bottom-16 left-4 w-80 bg-card border border-border rounded-xl shadow-2xl animate-scale-in z-50">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Стикеры</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          ×
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="emotions" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            😊
          </TabsTrigger>
          <TabsTrigger value="animals" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            🐶
          </TabsTrigger>
          <TabsTrigger value="gestures" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            👍
          </TabsTrigger>
          <TabsTrigger value="hearts" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            ❤️
          </TabsTrigger>
          <TabsTrigger value="celebration" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            🎉
          </TabsTrigger>
          <TabsTrigger value="food" className="text-xs rounded-none border-b-2 data-[state=active]:border-primary">
            🍕
          </TabsTrigger>
        </TabsList>

        {Object.entries(STICKER_CATEGORIES).map(([category, stickers]) => (
          <TabsContent key={category} value={category} className="m-0">
            <ScrollArea className="h-64">
              <div className="grid grid-cols-6 gap-2 p-3">
                {stickers.map((sticker, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelect(sticker);
                      onClose();
                    }}
                    className="text-3xl hover:scale-125 transition-transform duration-200 p-2 rounded hover:bg-muted"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
