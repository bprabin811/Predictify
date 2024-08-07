import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './components/sidebar-nav';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Bell, Braces, CircleUser, Palette, Receipt } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Settings',
  description:
    'Manage your account settings, billing plans, API keys, notifications, and appearance settings.',
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings',
    icon: <CircleUser size={16} />,
  },
  {
    title: 'Billing Plans',
    href: '/settings/plans',
    icon: <Receipt size={16} />,
  },
  {
    title: 'APIs Keys',
    href: '/settings/apikeys',
    icon: <Braces size={16} />,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell size={16} />,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: <Palette size={16} />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex w-full items-center justify-between border-b bg-[#fbfafa] dark:bg-card ">
        <div className="h-[80px] z-40 font-semibold flex px-4 text-16 gap-4 items-center">
          <Link href="/">
            <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
          </Link>
          Predictify<Badge className="py-0">Beta</Badge>{' '}
        </div>
      </div>
      <div className="container flex">
        <aside className="min-h-[80vh] w-[20%] border-r py-4 pr-4">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="h-full w-[80%] p-4">{children}</div>
      </div>
    </div>
  );
}
