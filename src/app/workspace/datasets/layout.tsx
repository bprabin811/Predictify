import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Bell,
  BotMessageSquare,
  Braces,
  BrainCircuit,
  CircleUser,
  Grid2x2Check,
  Palette,
  Receipt,
  Table2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarComponent } from '../components/sidebar-component';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'ML',
  description:
    'Manage your account settings, billing plans, API keys, notifications, and appearance settings.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: 'View Data',
    href: '/workspace/datasets',
    icon: <Table2 size={16} />,
    tab: 'ONE',
  },
  {
    title: 'Data Visualizations',
    href: '/workspace/datasets/visualize',
    icon: <BarChart3 size={16} />,
    tab: 'TWO',
  },
  {
    title: 'Feature Engineering',
    href: '/workspace/datasets/feature-engineering',
    icon: <Grid2x2Check size={16} />,
    tab: 'THREE',
  },
  {
    title: 'Train',
    href: '/workspace/datasets/train',
    icon: <BrainCircuit size={16} />,
    tab: 'FOUR',
  },
  {
    title: 'Playground',
    href: '/workspace/datasets/playground',
    icon: <BotMessageSquare size={16} />,
    tab: 'FIVE',
  },
];

export default function MLLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="h-[100vh] w-full ">{children}</div>
      <div className="fixed bottom-4 w-full gap-2 flex items-center justify-center ">
        <Card className="shadow-none">
          <Suspense fallback={<Loader />}>
            <SidebarComponent items={sidebarNavItems} />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
