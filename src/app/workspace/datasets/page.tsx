'use client';
import Chip from '@/components/chip';
import ViewDataTable from '@/components/view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary, CaseSensitive, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import VerticalBarChart from '@/components/workspace/verticalChart';
import HorizontalBarChart from '@/components/workspace/horizontalChart';
import DataCleaning from './components/DataClean';
import { Separator } from '@/components/ui/separator';
import useDataStore, { Insight, Stat } from '@/store/dataset/DatasetStore';
import useDatasetStore from '@/store/workspace/workspaceDatasets';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';

export interface Column {
  name: string;
  type: string;
}

interface InsightValue {
  [key: string]: number | string;
}

interface Insights {
  name: string;
  value: any;
}

const ProcessLayout = () => {
  const [dataId, setDataId] = useState(0);
  const searchParams = useSearchParams();
  const {
    tableData,
    getTableDatas,
    getColumnDetais,
    column_details,
    column_insights,
    data_set_size,
    dataset_name,
    graph_plots,
    isLoading,
    isSuccess,
    isColumnLoading,
    isColumnSuccess,
    isTableLoading,
    isTableSuccess,
  }: any = useDatasetStore();

  useEffect(() => {
    const didParam = searchParams.get('id');
    const didNumber = parseInt(didParam ?? '', 10);
    if (didNumber) {
      setDataId(didNumber);
      getTableDatas(didNumber);
      getColumnDetais(didNumber);
    }
  }, [searchParams, getTableDatas, getColumnDetais]);

  const [selectedChip, setSelectedChip] = useState<Column | null>(null);

  useEffect(() => {
    if (column_details && column_details.length > 0) {
      setSelectedChip(column_details[0]);
    }
  }, [column_details]);

  useEffect(() => {}, [tableData, column_details]);

  const filteredInsights = Object.entries(column_insights || {})
    .filter(([key]) => key === selectedChip?.name)
    .flatMap(([key, value]) =>
      Object.entries(value).map(([name, val]) => ({
        name,
        value: val,
      })),
    );

  const filteredGraph =
    (graph_plots?.find((plot) => plot[selectedChip?.name]) || {})[selectedChip?.name] || {};

  const isDataLoading = isColumnLoading || isTableLoading;
  const isDataSuccess = isColumnSuccess && isTableSuccess;

  return (
    <div className="w-full">
      {isDataLoading && (
        <div className="container flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      )}
      {isDataSuccess && (
        <div className="flex flex-1 gap-3 flex-col">
          <div className="py-6 border-b">
            <div className="container flex flex-col items-start">
              <Button variant={'link'} className="border-l rounded-none text-muted-foreground">
                Dataset
              </Button>
              <h1 className="text-24 font-semibold container ">{dataset_name}</h1>
            </div>
          </div>
          <div className="container">
            <ViewDataTable dataset={tableData} />
          </div>
          <div className="w-full flex items-start flex-col gap-10 pb-20">
            <div className="container flex gap-4">
              <div className={`w-[30%] h-[120px] shadow-none border rounded-[.4rem]`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-16 text-muted-foreground`}>{'Size'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-24 font-bold flex items-center gap-2">{data_set_size}</div>
                </CardContent>
              </div>
            </div>
            <Separator />
            <div className="container flex gap-4 flex-wrap">
              {column_details?.map((column: Column, index: number) => (
                <Chip
                  key={index}
                  leadingIcon={column?.type === 'str' ? <CaseSensitive /> : <Binary />}
                  label={column?.name}
                  onClick={() => {
                    setSelectedChip(column);
                  }}
                  selected={selectedChip?.name === column?.name}
                />
              ))}
            </div>
            {
              <div className="container flex gap-4">
                <Card className="w-[50%] h-[400px] shadow-none ">
                  <CardHeader className="flex flex-row items-center justify-between py-3 border-b">
                    <CardTitle className={`text-16 flex gap-2 items-center`}>
                      {selectedChip?.type === 'str' ? <CaseSensitive /> : <Binary />}
                      {selectedChip?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedChip?.type === 'str' ? (
                      <HorizontalBarChart
                        xLabel={filteredGraph?.xlabel}
                        yLabel={filteredGraph?.ylabel}
                      />
                    ) : (
                      <VerticalBarChart
                        xLabel={filteredGraph?.xlabel}
                        yLabel={filteredGraph?.ylabel}
                      />
                    )}
                  </CardContent>
                </Card>
                <div className="w-[50%] grid grid-cols-2 grid-rows-5 gap-4">
                  {filteredInsights?.map((card: Insights, index: number) => (
                    <Card
                      key={index}
                      className={`w-full shadow-none ${
                        card.name === 'null_value' && card.value === 0 ? 'hidden' : 'flex'
                      } flex-col py-2 px-4 items-start justify-center ${
                        index === filteredInsights.length - 1 ? 'bg-red-500/50' : ''
                      }`}>
                      <span className="text-muted-foreground text-12 font-normal w-full flex items-center gap-2">
                        <Info className="h-4 w-4" /> {card.name}
                      </span>
                      <span className="ml-6">{card.value}</span>
                    </Card>
                  ))}
                </div>
              </div>
            }
            <Separator />
            <DataCleaning dataset={tableData} dataId={dataId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessLayout;
