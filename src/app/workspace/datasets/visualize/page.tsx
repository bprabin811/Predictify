'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid, List, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import NotificationsCard from '@/components/org/Notifications';
import SettingsMenu from '@/components/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import MultiSelector from '@/components/MultiSelector';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PreviewCharts from './utils/PreviewCharts';
import { Card } from '@/components/ui/card';

const ChartDataset = [
  {
    key: 'bar',
    label: 'Bar Chart',
    component: BarChart,
  },
  {
    key: 'line',
    label: 'Line Chart',
    component: LineChart,
  },
];

const DataVisualize = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartTitle, setChartTitle] = useState('Untitled Chart');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('');
  const [xSelectedData, setXSelectedData] = useState<any[]>([]);
  const [ySelectedData, setYSelectedData] = useState<any[]>([]);
  const [dynamicCharts, setDynamicCharts] = useState<any[]>([]);

  const [viewOption, setViewOption] = useState<string>('grid');

  const handleXselected = (values: any[]) => {
    setXSelectedData(values);
  };

  const handleYselected = (values: any[]) => {
    setYSelectedData(values);
  };

  const handleSave = () => {
    const chartType = ChartDataset.find((chart) => chart.key === selectedChartType);
    if (!chartType) return;

    const newChart = {
      key: selectedChartType,
      label: chartTitle,
      component: (
        <chartType.component key={chartTitle} xAxisData={xSelectedData} yAxisData={ySelectedData} />
      ),
    };

    setDynamicCharts([...dynamicCharts, newChart]);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-card">
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
        <div className="w-full min-h-screen flex flex-col">
          <div className="w-full px-4 pt-8 pb-0 flex items-center justify-between">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
                <Button variant="secondary" className="flex gap-2">
                  <Plus size={16} /> Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new chart</DialogTitle>
                  <DialogDescription>{"Click save when you're done."}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="chartType">Chart Type</Label>
                    <Select onValueChange={setSelectedChartType} value={selectedChartType}>
                      <SelectTrigger id="chartType">
                        <SelectValue placeholder="Select chart" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {ChartDataset.map((chart, index) => (
                          <SelectItem key={index} value={chart.key}>
                            {chart.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="name">Chart Title</Label>
                    <Input
                      id="name"
                      placeholder="Enter title"
                      value={chartTitle}
                      onChange={(e) => setChartTitle(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="xAxisData">xAxisData</Label>
                    <MultiSelector
                      options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                      isMultiple={true}
                      onSelected={handleXselected}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="yAxisData">yAxisData</Label>
                    <MultiSelector
                      options={[120, 200, 150, 80, 70, 110, 130]}
                      isMultiple={true}
                      onSelected={handleYselected}
                    />
                  </div>
                </div>
                <Button variant="default" type="submit" className="w-fit" onClick={handleSave}>
                  Save
                </Button>
              </DialogContent>
            </Dialog>
            <div className="flex gap-2 items-center">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-1 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                  placeholder="Search..."
                />
              </div>
              <Button
                variant={viewOption === 'list' ? 'secondary' : 'outline'}
                onClick={() => {
                  setViewOption('list');
                }}>
                <List size={16} />
              </Button>
              <Button
                variant={viewOption === 'grid' ? 'secondary' : 'outline'}
                onClick={() => {
                  setViewOption('grid');
                }}>
                <Grid size={16} />
              </Button>
            </div>
          </div>
          {viewOption === 'grid' ? (
            <PreviewCharts dynamicCharts={dynamicCharts} />
          ) : (
            <div className="p-4 flex flex-col gap-4">
              {dynamicCharts.map((chart, index) => (
                <Card key={index}>
                  {/* <h3>{chart.label}</h3> */}
                  {chart.component}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
