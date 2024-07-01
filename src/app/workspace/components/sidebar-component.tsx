'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/Loader';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: any;
    tab: string;
  }[];
}

export function SidebarComponent({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataId, setDataId] = useState<number>();
  const [tabData, setTabData] = useState<string>('ONE');

  useEffect(() => {
    const dataIdParam = searchParams.get('id');
    if (dataIdParam) {
      setDataId(parseInt(dataIdParam));
    }

    const tabId = searchParams.get('tab');
    if (tabId) {
      setTabData(tabId);
    }
  }, [searchParams]);

  console.log(pathname);

  return (
    <div className="my-1 mx-4">
      <nav className={cn('flex space-x-2 items-center gap-2', className)} {...props}>
        {items.map((item, index) => (
          <>
            <Button
              key={index}
              variant={item.tab === tabData ? 'default' : 'link'}
              onClick={() => {
                router.push(`${item.href}?id=${dataId}&tab=${item.tab}`);
              }}
              disabled={index > 1}>
              <span className="mr-4">{item.icon}</span>
              {item.title}
            </Button>
            {index < 4 && <Separator orientation="vertical" className="h-10" />}
          </>
        ))}
      </nav>
    </div>
  );
}
