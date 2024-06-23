import React from 'react';
import { Button } from '@/components/ui/button';

interface ChipProps {
  label: string;
  onClick: () => void;
  selected: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, selected }) => (
  <Button
    variant={selected ? 'default' : 'outline'}
    className={` ${selected ? 'bg-primary border-[#4a4b4b]' : ''}`}
    onClick={onClick}>
    {label}
  </Button>
);

export default Chip;
