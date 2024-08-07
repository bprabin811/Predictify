import Loader from '@/components/Loader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Copy,
  CornerDownRight,
  Download,
  Ellipsis,
  FilePenLine,
  List,
  Printer,
  Share2,
  ShieldAlert,
} from 'lucide-react';
import React, { Suspense } from 'react';
import { ChartsList } from '@/config/chart';
import { ConfirmationAlert } from '@/components/utils/ConformationAlert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ChartPreviewProps {
  chartsData: any[];
  viewOption: string;
}

const componentMap = new Map(ChartsList.map(({ key, component }) => [key, component]));

const PreviewCharts: React.FC<ChartPreviewProps> = ({ chartsData, viewOption }) => {
  return (
    <div className="h-full w-full pb-20">
      {chartsData.length > 0 ? (
        <div
          className={`w-full h-full ${
            viewOption === 'grid'
              ? 'grid grid-cols-3 grid-rows-2'
              : viewOption === 'gridsmall'
              ? 'grid grid-cols-2 grid-rows-2'
              : 'grid grid-cols-1 grid-rows-2'
          } gap-4 py-4`}>
          {chartsData.map((item: any, index) => {
            const ChartComponent = componentMap.get(item.key);
            return (
              <Card
                key={`${item.key}-${index}`}
                className="w-full flex flex-col items-center justify-center shadow-none">
                <CardHeader className="w-full flex flex-row items-center justify-between py-3 border-b">
                  <CardTitle className={`text-16 flex gap-2 items-center`}>{item.label}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={'ghost'} className="py-0 px-2">
                        <Ellipsis size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col">
                      <DropdownMenuItem className="flex items-center gap-3">
                        <FilePenLine size={15} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-3">
                          <CornerDownRight size={15} />
                          Change to
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {/* {FilteredWorkspaces.map((item: any) => ( */}
                            <DropdownMenuItem
                              key={''}
                              // onClick={() => moveDataset(dataset?.id, item?.id)}
                              className="flex gap-2 items-center">
                              {/* <Folder size={16} /> */}
                              <span>{'hi'}</span>
                            </DropdownMenuItem>
                            {/* ))} */}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-3">
                          <List size={15} />
                          Options
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {/* {FilteredWorkspaces.map((item: any) => ( */}
                            <DropdownMenuItem
                              key={''}
                              // onClick={() => moveDataset(dataset?.id, item?.id)}
                              className="flex gap-2 items-center">
                              {/* <Folder size={16} /> */}
                              <span>{'hi'}</span>
                            </DropdownMenuItem>
                            {/* ))} */}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={() => {
                          // duplicateDataset(dataset?.id);
                        }}>
                        <Download size={15} />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={() => {
                          // duplicateDataset(dataset?.id);
                        }}>
                        <Printer size={15} />
                        Print
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={() => {
                          // duplicateDataset(dataset?.id);
                        }}>
                        <Copy size={15} />
                        Duplicate
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={() => {
                          // duplicateDataset(dataset?.id);
                        }}>
                        <Share2 size={15} />
                        Share
                      </DropdownMenuItem>

                      <ConfirmationAlert
                        handleConfirm={() => {
                          // deleteDataset(dataset?.id);
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <Suspense fallback={<Loader />}>
                  {ChartComponent ? (
                    <ChartComponent
                      xAxisData={item.xLabel}
                      yAxisData={item.yLabel}
                      data={item.data}
                      xLabel={item?.xAxis || item?.column}
                      yLabel={item?.yAxis}
                      plotoption={item?.option}
                    />
                  ) : (
                    <CardContent className="h-[100px] flex items-center justify-center">
                      {item?.error}
                    </CardContent>
                  )}
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
