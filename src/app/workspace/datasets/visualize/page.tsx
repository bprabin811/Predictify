'use client';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { List, Grid, Plus, Search, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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
import SelectOneColumn from './utils/SelectOneColumn';
import { dummyData } from '../components/data';
import { ChartsDataset } from './utils/data';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NotificationsCard from '@/components/org/Notifications';
import Loader from '@/components/Loader';
import SettingsMenu from '@/components/SettingsMenu';
import { Badge } from '@/components/ui/badge';

const DataVisualize = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isColumnsSelected, setIsColumnsSelected] = useState(false);
  const [chartTitle, setChartTitle] = useState('Untitled Chart');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dynamicCharts, setDynamicCharts] = useState<
    { key: string; label: string; component: JSX.Element | undefined; column: never[] }[]
  >([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedChart: '',
    },
    validationSchema: Yup.object({
      selectedChart: Yup.string().required('Selecting a method is required'),
    }),
    onSubmit: (values) => {
      if (isColumnsSelected) {
        toast(`${chartTitle} Chart has been created`);
        const chartComponent = ChartsDataset.find(
          (chart) => chart.key === values.selectedChart,
        )?.component;

        const newChart = {
          key: values.selectedChart,
          label: chartTitle,
          component: chartComponent,
          column: selectedColumns,
        };

        // Update DynamicCharts state
        setDynamicCharts([...dynamicCharts, newChart]);
        // Reset form and states after submission
        formik.resetForm();
        setSelectedColumns([]);
        setIsColumnsSelected(false);
        setChartTitle('');
        setIsDialogOpen(false);
      }
    },
  });

  if (!isClient) return null;

  const handleSelectedColumns = (columns: any) => {
    setSelectedColumns(columns);
    if (columns) {
      setIsColumnsSelected(true);
    } else {
      setIsColumnsSelected(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex h-16 w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-[#111]">
            <div className="flex z-40 font-semibold text-xl gap-4 items-center">
              <Link href="/">
                <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-8 w-8"></div>
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
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="name">Chart</Label>
                      <Select
                        onValueChange={(value) => formik.setFieldValue('selectedChart', value)}
                        value={formik.values.selectedChart}>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select chart" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {ChartsDataset.map((chart, index) => (
                            <SelectItem key={index} value={chart.key}>
                              {chart.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formik.touched.selectedChart && formik.errors.selectedChart ? (
                        <span className="text-red-500 text-xs">{formik.errors.selectedChart}</span>
                      ) : null}
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
                    <div>
                      <SelectOneColumn dataset={dummyData} selectedColumn={handleSelectedColumns} />
                      {isColumnsSelected ? null : (
                        <span className="text-red-500 text-xs">
                          Select column you want to visualize.
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="default" type="submit" className="w-fit">
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <div className="flex gap-2 items-center">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-1 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                  placeholder="Search..."
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <List size={16} />
              </Button>
              <Button variant="outline">
                <Grid size={16} />
              </Button>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-4 p-4">
            {dynamicCharts.length >= 1 ? (
              dynamicCharts.map((item) => (
                <Card key={item.key} className="flex items-center justify-center">
                  <Suspense fallback={<Loader />}>{item?.component}</Suspense>
                </Card>
              ))
            ) : (
              <Card className="w-full flex items-center justify-center flex-col gap-4 py-10">
                <History />
                <span>No charts to show.</span>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
