'use client';
import Loader from '@/components/Loader';
import { Card } from '@/components/ui/card';
import React, { useEffect, useState, Suspense } from 'react';
import { SidebarComponent } from '../../components/sidebar-component';
import { navBarData } from './constants';

const NavigationBar = () => {
  const [layout, setLayout] = useState('bottom');

  useEffect(() => {
    const storedLayout = localStorage.getItem('layout');
    if (storedLayout) {
      const parsedLayout = JSON.parse(storedLayout);
      if (parsedLayout.items && parsedLayout.items.length > 0) {
        setLayout(parsedLayout.items[0]);
      }
    }
  }, []);

  return (
    <div className={`fixed ${layout === 'right' ? 'top-[20%] right-4' : 'bottom-4 left-4'}`}>
      <Card className="dark:bg-gray-900">
        <Suspense fallback={<Loader />}>
          <SidebarComponent items={navBarData} layout={layout} />
        </Suspense>
      </Card>
    </div>
  );
};

export default NavigationBar;
