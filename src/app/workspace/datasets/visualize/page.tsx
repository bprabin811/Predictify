'use client';
import Loader from '@/components/Loader';
import SettingsMenu from '@/components/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const DataVisualize = () => {
  return (
    <div>
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-0">
            <div className="flex items-center gap-4">
              <div className="flex z-40 font-semibold text-xl gap-4 h-[60px] items-center px-4 lg:h-[60px] lg:px-6">
                <Link href="/">
                  <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
                </Link>
                Predictify<Badge className="py-0">Beta</Badge>
              </div>
            </div>
            <div className="px-4 ">
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="p-4 flex h-[80vh] items-center justify-center gap-2">
          <Loader />
          <span>Loading</span>
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
