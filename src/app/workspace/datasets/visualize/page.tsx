'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid, Grid2X2, List, Plus, Search } from 'lucide-react';
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
import useChartStore from '@/store/visualize';
import SearchParam from '@/components/utils/SearchParam';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import useDatasetStore from '@/store/workspace/workspaceDatasets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '@/components/Loader';

const DataVisualize = () => {
  const { charts, createChart, getCharts, isLoading, isSuccess }: any = useChartStore();
  const { getColumnDetais, column_details, isColumnLoading, isColumnSuccess }: any =
    useDatasetStore();
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewOption, setViewOption] = useState<string>('grid');

  const dataset_id = SearchParam('id');

  useEffect(() => {
    if (dataset_id) {
      getCharts(dataset_id);
      getColumnDetais(dataset_id);
    }
  }, [dataset_id, getCharts, getColumnDetais]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    option: Yup.string().required('Option is required'),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const checkType = (selectedData: string) => {
    const field = column_details.find((item: any) => item.name === selectedData);
    if (field?.type === 'int' || field?.type === 'float') {
      return true;
    }
    return false;
  };

  return (
    <div className="flex container flex-col">
      {isLoading && <Loader />}
      <div className="w-full pt-8 pb-0 flex items-center justify-between">
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
            <Formik
              initialValues={{
                title: '',
                comment: '',
                column: '',
                key: '',
                option: '',
                isSingle: false,
                xAxis: [],
                yAxis: [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const Success = await createChart(dataset_id, {
                  key: values.key,
                  label: values.title,
                  description: values.comment,
                  option: values.option,
                  column: values.column,
                  xAxis: values.xAxis,
                  yAxis: values.yAxis,
                });
                if (Success) {
                  setIsDialogOpen(false);
                  getCharts(dataset_id);
                }
              }}>
              {({ setFieldValue, values }) => (
                <Form className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="title">Chart Title</Label>
                    <Field as={Input} id="title" name="title" placeholder="Enter title" />
                    <ErrorMessage name="title" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <Label htmlFor="comment">Comments</Label>
                    <Field
                      as={Textarea}
                      id="comment"
                      name="comment"
                      className="resize-none"
                      rows={3}
                      placeholder="Enter comments"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isSingle"
                      checked={values.isSingle}
                      onCheckedChange={() => {
                        setFieldValue('column', '');
                        setFieldValue('xAxis', []);
                        setFieldValue('yAxis', []);
                        setFieldValue('isSingle', !values.isSingle);
                      }}
                    />
                    <label
                      htmlFor="isSingle"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Is Single Column?
                    </label>
                  </div>
                  {values.isSingle ? (
                    <>
                      <div className="w-full">
                        <Label htmlFor="Column">Select Column</Label>
                        <MultiSelector
                          options={column_details?.map((col: any) => col.name)}
                          isMultiple={false}
                          onSelected={(values) => {
                            setFieldValue('column', values[0]);
                            setFieldValue('option', '');
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="chartType">Chart Type</Label>
                        <Select
                          onValueChange={(value) => {
                            setFieldValue('key', value);
                            setFieldValue('option', '');
                          }}
                          value={values.key}>
                          <SelectTrigger id="chartType">
                            <SelectValue placeholder="Select chart" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {ChartsList.filter(
                              (item) =>
                                item.key !== 'scatter' &&
                                item.key !== 'linear_regression' &&
                                item.key !== 'polynomial_regression' &&
                                item.key !== 'exponential_regression',
                            ).map((chart) => (
                              <SelectItem key={chart.id} value={chart.key}>
                                {chart.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {ChartsList?.filter((chart) => values.key === chart.key)?.map((chart) => (
                        <div className="w-full" key={chart.id}>
                          <Label htmlFor="option">Plot Options</Label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue('option', value);
                            }}
                            value={values.option}>
                            <SelectTrigger id="option">
                              <SelectValue placeholder="Select Plot Option" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {checkType(values.column)
                                ? chart.list.map((option, index) => (
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))
                                : chart.list.slice(0, 1).map((option, index) => (
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="option" component="div" className="text-red-500" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="xAxisData">X-Axis</Label>
                        <MultiSelector
                          options={column_details?.map((col: any) => col.name)}
                          isMultiple={false}
                          onSelected={(values) => {
                            setFieldValue('xAxis', values);
                          }}
                        />
                        <Label htmlFor="yAxisData">Y-Axis</Label>
                        <MultiSelector
                          options={column_details?.map((col: any) => col.name)}
                          isMultiple={false}
                          onSelected={(values) => {
                            setFieldValue('yAxis', values);
                          }}
                        />

                        <div className="mb-4">
                          <Label htmlFor="chartType">Chart Type</Label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue('key', value);
                              setFieldValue('option', '');
                            }}
                            value={values.key}>
                            <SelectTrigger id="chartType">
                              <SelectValue placeholder="Select chart" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {checkType(values.xAxis[0]) && checkType(values.yAxis[0]) ? (
                                ChartsList.filter(
                                  (item) =>
                                    item.key !== 'pie' &&
                                    item.key !== 'doughnut' &&
                                    item.key !== 'customized_pie',
                                ).map((chart) => (
                                  <SelectItem key={chart.id} value={chart.key}>
                                    {chart.name}
                                  </SelectItem>
                                ))
                              ) : checkType(values.yAxis[0]) ? (
                                ChartsList.filter(
                                  (item) =>
                                    item.key !== 'pie' &&
                                    item.key !== 'doughnut' &&
                                    item.key !== 'customized_pie' &&
                                    item.key !== 'scatter' &&
                                    item.key !== 'linear_regression' &&
                                    item.key !== 'polynomial_regression' &&
                                    item.key !== 'exponential_regression',
                                ).map((chart) => (
                                  <SelectItem key={chart.id} value={chart.key}>
                                    {chart.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <></>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        {ChartsList?.filter((chart) => values.key === chart.key)?.map((chart) => (
                          <div className="w-full" key={chart.id}>
                            <Label htmlFor="option">Plot Options</Label>
                            <Select
                              onValueChange={(value) => {
                                setFieldValue('option', value);
                              }}
                              value={values.option}>
                              <SelectTrigger id="option">
                                <SelectValue placeholder="Select Plot Option" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {checkType(values.yAxis[0]) &&
                                  chart.list.slice(1).map((option, index) => (
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <ErrorMessage name="option" component="div" className="text-red-500" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <Button variant="default" type="submit" className="w-fit">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
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
            variant={viewOption === 'gridsmall' ? 'secondary' : 'outline'}
            onClick={() => {
              setViewOption('gridsmall');
            }}>
            <Grid2X2 size={16} />
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
      {isSuccess && <PreviewCharts chartsData={charts} viewOption={viewOption} />}
    </div>
  );
};

export default DataVisualize;
