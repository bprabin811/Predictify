'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/Loader';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { ChevronRight } from 'lucide-react';

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

  const [isExpand, setIsExpand] = useState(true);

  return (
    <div className="my-1 mx-4 flex items-center gap-2">
      <Link href="/">
        <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
      </Link>
      <Button
        variant={'ghost'}
        onClick={() => {
          setIsExpand(!isExpand);
        }}>
        <ChevronRight size={16} className={cn('transition-transform', { 'rotate-90': isExpand })} />
      </Button>
      <nav
        className={cn(
          'flex space-x-2 items-center gap-2 transition-all duration-300',
          { 'max-w-0 overflow-hidden': !isExpand, 'max-w-full': isExpand },
          className,
        )}
        {...props}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <Button
              variant={item.tab === tabData ? 'default' : 'link'}
              onClick={() => {
                router.push(`${item.href}?id=${dataId}&tab=${item.tab}`);
              }}
              disabled={index > 2}>
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Button>
            {index > 2 && <Badge>Pro</Badge>}
            {index < 4 && <Separator orientation="vertical" className="h-10" />}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
