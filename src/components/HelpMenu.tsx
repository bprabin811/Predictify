// components/HelpMenu.tsx

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleHelp, Sparkles, MessageCircle, Headset, BookOpen, Settings } from 'lucide-react';

const HelpMenu: React.FC = () => {
  return (
    <div className="fixed right-10 bottom-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            <CircleHelp size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <DropdownMenuItem className="flex items-center gap-3">
            <Sparkles size={15} />
            Feature Request
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3">
            <Headset size={15} />
            Contact Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3">
            <BookOpen size={15} />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HelpMenu;
