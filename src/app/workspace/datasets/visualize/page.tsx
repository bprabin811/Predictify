'use client';
import { useState } from 'react';
import Loader from '@/components/Loader';
import SettingsMenu from '@/components/SettingsMenu';
import NotificationsCard from '@/components/org/Notifications';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import ScatterPlot from './components/ScatterChart';
import Heatmap from './components/Heatmap';
import BoxPlot from './components/BoxPlot';
import Histogram from './components/Histogram';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Chip from '@/components/chip';
import {
  BarChart2,
  BoxIcon,
  Heater,
  HistoryIcon,
  LineChart as LineChartIcon,
  ScatterChart,
  Search,
  ShieldQuestion,
} from 'lucide-react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const chartComponents: { [key: string]: React.ElementType } = {
  bar: BarChart,
  line: LineChart,
  scatter: ScatterPlot,
  heatmap: Heatmap,
  box: BoxPlot,
  histogram: Histogram,
};

const chartItems = [
  { key: 'bar', label: 'Bar Chart', icon: <BarChart2 size={16} /> },
  { key: 'line', label: 'Line Chart', icon: <LineChartIcon size={16} /> },
  { key: 'scatter', label: 'Scatter Plot', icon: <ScatterChart size={16} /> },
  { key: 'heatmap', label: 'Heatmap', icon: <Heater size={16} /> },
  { key: 'box', label: 'Box Plot', icon: <BoxIcon size={16} /> },
  { key: 'histogram', label: 'Histogram', icon: <HistoryIcon size={16} /> },
];

const DataVisualize = () => {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [searchQuery, setSearchQuery] = useState('');

  const SelectedChartComponent = chartComponents[selectedChart];

  const filteredChart = chartItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full px-4">
      <div className="flex flex-1  flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-0">
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
        <div className="w-full h-[90vh] grid grid-cols-[18vw_1fr_20vw]">
          <div className="flex flex-col gap-4 border-r py-4 pr-4">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className=" uppercase font-semibold text-xs">Basic Charts</h4>
              <Separator />
            </div>
            <div className="flex flex-col gap-2">
              {filteredChart.slice(0, 3).map((item) => (
                <Button
                  key={item.key}
                  variant={selectedChart === item.key ? 'secondary' : 'ghost'}
                  className="flex gap-2 flex-wrap items-center justify-start text-xs text-muted-foreground"
                  onClick={() => setSelectedChart(item.key)}>
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h4 className=" uppercase font-semibold text-xs">Advance Charts</h4>
              <Separator />
            </div>
            <div className="flex flex-col gap-2">
              {filteredChart.slice(3, 6).map((item) => (
                <Button
                  key={item.key}
                  variant={selectedChart === item.key ? 'secondary' : 'ghost'}
                  className="flex gap-2 flex-wrap items-center justify-start text-xs text-muted-foreground"
                  onClick={() => setSelectedChart(item.key)}>
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="p-4">
            <div className="border h-[60vh] rounded-[.4rem] shadow-none">
              <Suspense fallback={<Loader />}>
                <SelectedChartComponent />
              </Suspense>
            </div>
            <Alert className="bg-red-50 dark:bg-opacity-10 mt-4 mb-20">
              <ShieldQuestion className="h-4 w-4" />
              <AlertTitle className="uppercase">Comment</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Please note that pricing and billing terms are subject to change. Predictify
                reserves the right to discontinue or modify pricing plans, features, or billing
                cycles at any time. Changes will be communicated via email or through our website.
                In the event of any changes, you will have the option to continue or cancel your
                subscription as per our terms of service. <br /> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
                officiis cupiditate placeat, odio voluptates! Inventore, aspernatur sit. Laudantium
                incidunt placeat ab atque magni id quos repudiandae asperiores minima pariatur,
                earum sit possimus molestias minus omnis facilis deleniti officiis. Aliquam
                doloribus optio itaque maiores repudiandae, perferendis nulla omnis recusandae ullam
                qui dolor possimus doloremque est. Quaerat ducimus corrupti placeat, minus earum ea
                officia natus culpa vel pariatur deserunt molestiae ratione cum voluptas facilis ut
                accusantium id ad similique dolore aliquid magni voluptate quis. Porro culpa
                molestiae aliquam quibusdam. Explicabo, laudantium recusandae totam deserunt saepe
                odit sequi. Esse quos ipsum sed.
              </AlertDescription>
            </Alert>
          </ScrollArea>
          <div className="h-full py-4">
            <Card className="w-full border h-[60%] rounded-[.4rem] shadow-none"></Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
