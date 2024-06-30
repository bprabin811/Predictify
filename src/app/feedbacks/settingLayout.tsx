'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessagesSquare, NotepadText } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row gap-5 min-h-screen mx-4 px-5 md:px-5">
      <div className="flex min-h-screen w-full flex-col">
        <nav className="flex z-40 font-semibold text-xl gap-4 h-[60px] items-center px-2">
          <Link href="/">
            <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
          </Link>
          Predictify
        </nav>

        <div className="m-2">
          <div className="flex gap-4 border-b h-8 text-muted-foreground">
            <Link
              href="/feedbacks"
              className={`border-b-2 flex gap-2 items-center ${
                activePath === '/feedbacks' ? 'border-primary text-primary' : 'border-transparent'
              }`}>
              <MessagesSquare size={16} />
              Feedbacks
            </Link>
            <Separator orientation="vertical" />
            <Link
              href="/feedbacks/status"
              className={`border-b-2 flex gap-2 items-center ${
                activePath === '/feedbacks/status'
                  ? 'border-primary text-primary'
                  : 'border-transparent'
              }`}>
              <NotepadText size={16} />
              Status
            </Link>
          </div>
          <div className="flex">{children}</div>
        </div>
      </div>
    </div>
  );
}
