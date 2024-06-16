import React from 'react';
import { Button } from '@/components/ui/button';

const Chip = ({ label, onClick, selected }) => (
  <Button
    variant={selected ? 'solid' : 'outline'}
    className={` ${selected ? 'bg-primary border-[#4a4b4b]' : ''}`}
    onClick={onClick}>
    {label}
  </Button>
);

export default Chip;
