'use client';
import SettingsMenu from '@/components/org/SettingsMenu';
import Chip from '@/components/chip';
import NotificationsCard from '@/components/org/Notifications';
import ViewDataTable from '@/components/view';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary, CaseSensitive, File, Info, Rows, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import VerticalBarChart from '@/components/workspace/verticalChart';
import HorizontalBarChart from '@/components/workspace/horizontalChart';
import DataCleaning from './components/DataClean';
import { Separator } from '@/components/ui/separator';
import useDataStore, { Column, Insight, Stat } from '@/store/dataset/DatasetStore';

const ProcessLayout = () => {
  const { stats, columns, largeDataset, insights, dummyData }: any = useDataStore();
  const [selectedChip, setSelectedChip] = useState(columns[0]);

  const filteredInsights =
    selectedChip.type === 'string'
      ? insights.filter((insight: Insight) => insight.label === 'Count')
      : insights;

  return (
    <div className="w-full">
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-card ">
            <div className="h-[60px] flex z-40 font-semibold text-xl gap-4 items-center">
              <Link href="/">
                <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
              </Link>
              Predictify<Badge className="py-0">Beta</Badge>
            </div>
            <div className="flex gap-2">
              <NotificationsCard />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="px-4">
          <ViewDataTable dataset={dummyData} />
        </div>
        <div className="w-full flex items-start flex-col gap-10 px-4 pb-20">
          <div className="w-full flex gap-4">
            {stats.map((stat: Stat) => (
              <div
                key={stat.id}
                className={`w-[30%] h-[120px] shadow-none  border rounded-[.4rem]`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium text-${stat.color} uppercase`}>
                    {stat.title}
                  </CardTitle>
                  {/* <stat.icon size={20} className="" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    {stat.id === 2 ? `${stat.count} MB` : stat.count}
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex gap-4 flex-wrap">
            {columns.map((column: Column, index: number) => (
              <Chip
                key={index}
                leadingIcon={
                  column.type === 'string' ? (
                    <CaseSensitive className="text-orange-300 " />
                  ) : (
                    <Binary className="text-blue-300" />
                  )
                }
                label={column.Header}
                onClick={() => {
                  setSelectedChip(column);
                }}
                selected={selectedChip.accessor === column.accessor}
              />
            ))}
          </div>
          <div className="w-full flex gap-4">
            <Card className="w-[50%] h-[400px] shadow-none ">
              <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
                <CardTitle className={`text-sm font-medium flex gap-2 items-center`}>
                  {selectedChip.type === 'string' ? (
                    <CaseSensitive className="text-orange-300 " />
                  ) : (
                    <Binary className="text-blue-300" />
                  )}
                  {selectedChip.Header}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChip.type === 'string' ? (
                  <HorizontalBarChart data={largeDataset} />
                ) : (
                  <VerticalBarChart data={largeDataset} />
                )}
              </CardContent>
            </Card>
            <div className="w-[50%] grid grid-cols-2 grid-rows-5 gap-4">
              {filteredInsights.map((card: Insight, index: number) => (
                <Card
                  key={index}
                  className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center ">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> {card.label}
                  </span>
                  <span className="ml-6">{card.value}</span>
                </Card>
              ))}
            </div>
          </div>
          <Separator />
          <DataCleaning dataset={dummyData} />
        </div>
      </div>
    </div>
  );
};

export default ProcessLayout;
