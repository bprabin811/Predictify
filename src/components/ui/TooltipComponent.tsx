'use client';
import * as React from 'react';
import { useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-green-500 p-4 text-white shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}>
    {props.children}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface StepTooltipProps {
  steps: { title: string; description: string }[];
  onClose: () => void;
}

const StepTooltip: React.FC<StepTooltipProps> = ({ steps, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="rounded-lg bg-white px-4 py-2 text-green-500">
            Hover or focus me
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-start justify-between">
            <h3 className="font-bold">{steps[currentStep].title}</h3>
            <button onClick={onClose} className="ml-4 text-lg">
              &times;
            </button>
          </div>
          <p className="mt-2">{steps[currentStep].description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span>
              {currentStep + 1} of {steps.length}
            </span>
            <button onClick={nextStep} className="rounded-lg bg-white px-4 py-2 text-green-500">
              Next
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { StepTooltip, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
