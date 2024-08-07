import React from 'react';
import SettingsMenu from '../org/SettingsMenu';
import Link from 'next/link';
import NotificationsCard from '../org/Notifications';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const Topbar = () => {
  return (
    <div className="flex w-full items-center justify-between border-b bg-[#fbfafa] dark:bg-card ">
      <div className="h-[80px] z-40 font-semibold flex px-4 text-16 gap-4 items-center">
        <Link href="/">
          <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
        </Link>
        Predictify<Badge className="py-0">Beta</Badge>{' '}
      </div>
      <div className="flex gap-2 pr-4">
        <NotificationsCard />
        <SettingsMenu isLabel={false} />
      </div>
    </div>
  );
};

export default Topbar;
