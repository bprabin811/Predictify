'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BookOpenText, MessagesSquare, NotepadText } from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-5 min-h-screen">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex w-full h-[60px] items-center bg-[#FBFAFA] dark:bg-card px-[10%] border-b z-40">
          <nav className="flex  font-semibold text-xl gap-4 ">
            <Link href="/">
              <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
            </Link>
            Predictify
          </nav>

          <div className="flex items-center justify-between w-full pl-10">
            <div className="flex gap-4 h-8 text-muted-foreground ">
              <Link
                href="/feedbacks"
                className={` flex gap-2 items-center ${
                  activePath === '/feedbacks' ? 'border-primary text-primary' : 'border-transparent'
                }`}>
                <MessagesSquare size={16} />
                Feedbacks
              </Link>
              <Separator orientation="vertical" />
              <Link
                href="/feedbacks/status"
                className={` flex gap-2 items-center ${
                  activePath === '/feedbacks/status' ? ' text-primary' : 'border-transparent'
                }`}>
                <NotepadText size={16} />
                Status
              </Link>
            </div>
            <div>
              <Link
                href="#"
                className={`border-b-2 flex gap-2 items-center ${
                  activePath === '/feedbacks/#' ? ' text-primary' : 'border-transparent'
                }`}>
                <BookOpenText size={16} />
                Documentation
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">{children}</div>
      </div>
    </div>
  );
}
