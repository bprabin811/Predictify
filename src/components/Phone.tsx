import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ className, dark = false, ...props }: PhoneProps) => {
  return (
    <div className={cn('relative pointer-events-none z-50 overflow-hidden', className)} {...props}>
      <Image
        src={dark ? '/dark-template.png' : '/light-template.png'}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
    </div>
  );
};

export default Phone;
