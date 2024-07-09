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
import { navBarData } from './components/constants';
import NavigationBar from './components/NavigationBar';

export const metadata: Metadata = {
  title: 'ML',
  description:
    'Manage your account settings, billing plans, API keys, notifications, and appearance settings.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function MLLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="h-[100vh] w-full ">{children}</div>
      <NavigationBar />
    </div>
  );
}
