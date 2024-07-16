import Loader from '@/components/Loader';
import { Card } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';

interface ChartPreviewProps {
  dynamicCharts: { key: string; label: string; component: React.ReactNode }[];
}

const PreviewCharts: React.FC<ChartPreviewProps> = ({ dynamicCharts }) => {
  return (
    <div className="h-full w-full">
      {dynamicCharts.length > 0 ? (
        <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-4 p-4 ">
          {dynamicCharts.map((item, index) => (
            <Card key={`${item.key}-${index}`} className="flex items-center justify-center">
              <Suspense fallback={<Loader />}>{item.component}</Suspense>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full h-[60vh] flex items-center justify-center flex-col gap-4 p-4 text-muted-foreground">
          <ShieldAlert size={80} className='text-gray-200 dark:text-opacity-20'/>
          <span>No charts has been created yet.</span>
        </div>
      )}
    </div>
  );
};

export default PreviewCharts;
