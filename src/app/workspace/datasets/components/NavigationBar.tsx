import Loader from '@/components/Loader';
import { Card } from '@/components/ui/card';
import React, { Suspense } from 'react'
import { SidebarComponent } from '../../components/sidebar-component';
import { navBarData } from './constants';

const NavigationBar = () => {
  return (
    <div className="fixed left-4 bottom-4 ">
      <Card className="dark:bg-gray-900">
        <Suspense fallback={<Loader />}>
          <SidebarComponent items={navBarData} />
        </Suspense>
      </Card>
    </div>
  );
}

export default NavigationBar