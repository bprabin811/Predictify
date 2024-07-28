import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipProps {
  children: React.ReactNode;
  comment: string;
  isVisible?: boolean;
}

const TooltipComponent: React.FC<TooltipProps> = ({ children, comment, isVisible = false }) => {
  return (
    <TooltipProvider>
      <Tooltip open={isVisible ? true : undefined}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={`p-4 bg-green-600/50`}>
          <p>{comment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
