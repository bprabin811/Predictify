'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Settings,
  User,
  Shield,
  Braces,
  Palette,
  LogOut,
  Moon,
  Sun,
  LaptopMinimal,
  Receipt,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { ReportAnIssue } from './org/report-issues';
import { toast } from 'sonner';

interface SettingsMenuProps {
  isLabel: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isLabel }) => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token');
    router.push('/auth/login');
    toast('You have been logged out successfully.', {
      position: 'top-right',
      duration: 2000,
    });
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="p-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
            <Settings size={16} />
            {isLabel && 'Settings'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <Link href={'/settings'}>
            <DropdownMenuItem className="flex items-center gap-3">
              <User size={15} />
              Account Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href={'/settings/plans'}>
            <DropdownMenuItem className="flex items-center gap-3">
              <Receipt size={15} />
              Billing Plan
            </DropdownMenuItem>
          </Link>
          <Link href={'/settings/apikeys'}>
            <DropdownMenuItem className="flex items-center gap-3">
              <Braces size={15} />
              API Token
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-3">
              <Palette size={15} />
              Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <LaptopMinimal className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem className="flex items-center gap-3" onClick={handleLogout}>
            <ReportAnIssue />
          </DropdownMenuItem> */}
          <DropdownMenuItem className="flex items-center gap-3" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsMenu;
