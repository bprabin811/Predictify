import Loader from '@/components/Loader';
import { Card, CardFooter } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';
import { ChartsList } from '@/config/chart';

interface ChartPreviewProps {
  chartsData: any[];
  viewOption: string;
}

const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]));

const PreviewCharts: React.FC<ChartPreviewProps> = ({ chartsData, viewOption }) => {
  return (
    <div className="h-full w-full">
      {chartsData.length > 0 ? (
        <div
          className={`w-full h-full ${
            viewOption === 'grid' ? 'grid grid-cols-3 grid-rows-2' : 'grid grid-cols-1 grid-rows-2'
          } gap-4 p-4`}>
          {chartsData.map((item, index) => {
            const ChartComponent = componentMap.get(item.key);
            return (
              <Card
                key={`${item.key}-${index}`}
                className="flex flex-col items-center justify-center shadow-none">
                <Suspense fallback={<Loader />}>
                  {ChartComponent ? (
                    <ChartComponent
                      xAxisData={item.xAxisData}
                      yAxisData={item.yAxisData}
                      data={item.data}
                    />
                  ) : (
                    <div>Chart component not found for key: {item.key}</div>
                  )}
                  <CardFooter>{item.label}</CardFooter>
                </Suspense>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-[60vh] flex items-center justify-center flex-col gap-4 p-4 text-muted-foreground">
          <ShieldAlert size={80} className="text-gray-200 dark:text-opacity-20" />
          <span>No charts have been created yet.</span>
        </div>
      )}
    </div>
  );
};

export default PreviewCharts;
