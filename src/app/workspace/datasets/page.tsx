'use client';
import SettingsMenu from '@/components/SettingsMenu';
import Chip from '@/components/chip';
import NotificationsCard from '@/components/org/Notifications';
import ViewDataTable from '@/components/processes/view';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary, CaseSensitive, File, Info, Rows, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import VerticalBarChart from '../components/verticalChart';
import HorizontalBarChart from '../components/horizontalChart';
import { Columns, dummyData, insights, largeDataset, stats } from './components/data';
import DataCleaning from './components/DataClean';
import { Separator } from '@/components/ui/separator';

interface Version {
  id: number;
  timestamp: string;
  description: string;
  data: [];
}

const ProcessLayout = () => {
  const [selectedChip, setSelectedChip] = useState(Columns[0]);

  const [dataset, setDataset] = useState<any>(dummyData);
  const [versions, setVersions] = useState<Version[]>([]);

  const applyChanges = (newDataset: any) => {
    setDataset(newDataset);
    createVersion(`Applied changes on ${new Date().toLocaleString()}`);
  };

  const createVersion = (description: string) => {
    const newVersion: Version = {
      id: versions.length,
      timestamp: new Date().toLocaleString(),
      description,
      data: dataset,
    };
    setVersions([...versions, newVersion]);
  };

  const restoreVersion = (id: number) => {
    const version = versions.find((v) => v.id === id);
    if (version) {
      setDataset(version.data);
    }
  };

  const filteredInsights =
    selectedChip.type === 'string'
      ? insights.filter((insight) => insight.label === 'Count')
      : insights;

  return (
    <div className="w-full">
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-[#111]">
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
            {stats.map((stat) => (
              <Card
                key={stat.id}
                className={`w-[30%] h-[120px] shadow-none bg-${stat.bg}-50 dark:bg-${stat.bg}-950 dark:bg-opacity-30`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium text-${stat.color} uppercase`}>
                    {stat.title}
                  </CardTitle>
                  <stat.icon size={20} className="" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    {stat.id === 2 ? `${stat.count} MB` : stat.count}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator />
          <div className="flex gap-4 flex-wrap">
            {Columns.map((column, index) => (
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
            <Card className="w-[50%] h-[400px] shadow-none">
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
              {filteredInsights.map((card, index) => (
                <Card
                  key={index}
                  className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> {card.label}
                  </span>
                  <span className="ml-6">{card.value}</span>
                </Card>
              ))}
            </div>
          </div>
          <Separator />
          <DataCleaning dataset={dataset} applyChanges={applyChanges} />
        </div>
      </div>
    </div>
  );
};

export default ProcessLayout;
