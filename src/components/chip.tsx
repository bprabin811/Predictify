import React from 'react';
import { Button } from '@/components/ui/button';

interface ChipProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  leadingIcon: any;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, selected, leadingIcon }) => (
  <Button
    variant={selected ? 'default' : 'outline'}
    className={`${
      selected ? 'bg-primary border-[#4a4b4b] flex items-center gap-2' : 'flex items-center gap-2'
    } text-xs` }
    onClick={onClick}>
    {leadingIcon}
    {label}
  </Button>
);

export default Chip;
