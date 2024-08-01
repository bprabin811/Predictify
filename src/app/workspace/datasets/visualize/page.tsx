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
import SettingsMenu from '@/components/org/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import MultiSelector from '@/components/MultiSelector';
import PreviewCharts from './utils/PreviewCharts';
import { ChartsList } from '@/config/chart';
import { toast } from 'sonner';

const dummy_charts = [
  {
    key: 'line',
    label: 'Line Chart of Population',
    xAxisData: ['Jan', 'Feb', 'Mar'],
    yAxisData: [10, 30, 20],
  },
  {
    key: 'bar',
    label: 'Bar Chart of Population',
    xAxisData: ['Q1', 'Q2', 'Q3'],
    yAxisData: [100, 150, 300],
  },
  {
    key: 'area',
    label: 'Area Chart',
    xAxisData: ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries'],
    yAxisData: [5, 20, 36, 10, 10],
  },
  {
    key: 'area',
    label: 'This week sales',
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yAxisData: [120, 200, 150, 80, 70, 110, 130],
  },
  {
    key: 'scatter',
    label: 'Scatter Plot',
    data: [
      [10, 8],
      [20, 15],
      [30, 12],
      [40, 25],
      [50, 22],
    ],
  },
];

const DataVisualize = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartTitle, setChartTitle] = useState('Untitled Chart');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('');
  const [xSelectedData, setXSelectedData] = useState<any[]>([]);
  const [ySelectedData, setYSelectedData] = useState<string>('');
  const [viewOption, setViewOption] = useState<string>('grid');
  const [chartsData, setChartsData] = useState(dummy_charts);

  const optionList = ChartsList?.filter((chart) => selectedChartType === chart.key);

  const handleXselected = (values: any[]) => {
    setXSelectedData(values);
  };

  const handleYselected = (values: string) => {
    setYSelectedData(values);
  };

  const handleSave = () => {
    if (selectedChartType === '' || xSelectedData.length === 0 || ySelectedData === '') {
      return;
    }
    console.log({
      key: selectedChartType,
      label: chartTitle,
      xAxisData: xSelectedData,
      yAxisData: ySelectedData,
    });

    toast('Your chart has been successfully created and added to the preview list.', {
      position: 'top-right',
      duration: 2000,
    });
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
        <div className="w-full min-h-screen flex flex-col pb-20">
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
                        {ChartsList.map((chart) => (
                          <SelectItem key={chart.id} value={chart.key}>
                            {chart.name}
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
                    <Label htmlFor="xAxisData">Columns</Label>
                    <MultiSelector
                      options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                      isMultiple={true}
                      onSelected={handleXselected}
                    />
                  </div>
                  {optionList?.map((chart) => (
                    <div className="w-full" key={chart.id}>
                      <Label htmlFor="yAxisData">Options</Label>
                      <MultiSelector
                        options={chart?.list}
                        isMultiple={false}
                        onSelected={handleYselected}
                      />
                    </div>
                  ))}
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
          <PreviewCharts chartsData={chartsData} viewOption={viewOption} />
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
