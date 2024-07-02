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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Dummy data
const dummyData = [
  {
    id: 1,
    address: '123 Maple St, Springfield, IL',
    price: 250000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1500,
    lot_size: '0.25 acres',
    year_built: 1995,
    status: 'For Sale',
    agent: 'Alice Johnson',
  },
  {
    id: 2,
    address: '456 Oak St, Springfield, IL',
    price: 320000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 2000,
    lot_size: '0.30 acres',
    year_built: 2000,
    status: 'For Sale',
    agent: 'Bob Smith',
  },
  {
    id: 3,
    address: '789 Pine St, Springfield, IL',
    price: 180000,
    bedrooms: 2,
    bathrooms: 1,
    sq_ft: 1200,
    lot_size: '0.20 acres',
    year_built: 1985,
    status: 'For Sale',
    agent: 'Carol Lee',
  },
  {
    id: 4,
    address: '101 Cedar St, Springfield, IL',
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1600,
    lot_size: '0.27 acres',
    year_built: 1998,
    status: 'For Sale',
    agent: 'David Brown',
  },
  {
    id: 5,
    address: '202 Birch St, Springfield, IL',
    price: 350000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 2100,
    lot_size: '0.35 acres',
    year_built: 2005,
    status: 'For Sale',
    agent: 'Emma Davis',
  },
  {
    id: 6,
    address: '303 Elm St, Springfield, IL',
    price: 260000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1550,
    lot_size: '0.26 acres',
    year_built: 1997,
    status: 'For Sale',
    agent: 'Frank Wilson',
  },
  {
    id: 7,
    address: '404 Walnut St, Springfield, IL',
    price: 290000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1700,
    lot_size: '0.28 acres',
    year_built: 2001,
    status: 'For Sale',
    agent: 'Grace Miller',
  },
  {
    id: 8,
    address: '505 Ash St, Springfield, IL',
    price: 240000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1450,
    lot_size: '0.24 acres',
    year_built: 1994,
    status: 'For Sale',
    agent: 'Hank Moore',
  },
  {
    id: 9,
    address: '606 Redwood St, Springfield, IL',
    price: 300000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 1900,
    lot_size: '0.29 acres',
    year_built: 2003,
    status: 'For Sale',
    agent: 'Ivy Clark',
  },
  {
    id: 10,
    address: '707 Cypress St, Springfield, IL',
    price: 270000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1600,
    lot_size: '0.27 acres',
    year_built: 1999,
    status: 'For Sale',
    agent: 'Jack White',
  },
];

const stats = [
  {
    id: 1,
    title: 'No of Rows',
    count: 1240,
    color: 'blue-500',
    icon: Rows,
  },
  {
    id: 2,
    title: 'File Size',
    count: 30,
    color: 'green-500',
    icon: File,
  },
];

const Columns = [
  {
    Header: 'ID',
    accessor: 'id',
    type: 'int',
  },
  {
    Header: 'Address',
    accessor: 'address',
    type: 'string',
  },
  {
    Header: 'Price',
    accessor: 'price',
    type: 'float',
  },
  {
    Header: 'Bedrooms',
    accessor: 'bedrooms',
    type: 'int',
  },
  {
    Header: 'Bathrooms',
    accessor: 'bathrooms',
    type: 'int',
  },
  {
    Header: 'Sq Ft',
    accessor: 'sq_ft',
    type: 'float',
  },
  {
    Header: 'Lot Size',
    accessor: 'lot_size',
    type: 'string',
  },
  {
    Header: 'Year Built',
    accessor: 'year_built',
    type: 'int',
  },
  {
    Header: 'Status',
    accessor: 'status',
    type: 'string',
  },
  {
    Header: 'Agent',
    accessor: 'agent',
    type: 'string',
  },
];

const largeDataset = Array.from({ length: 10 }, (_, index) => ({
  name: `Item ${index + 1}`,
  value: Math.floor(Math.random() * 1000),
}));

const ProcessLayout = () => {
  const [selectedChip, setSelectedChip] = useState(Columns[0]);
  return (
    <div>
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-0">
            <div className="flex items-center gap-4">
              <div className="flex z-40 font-semibold text-xl gap-4 h-[60px] items-center px-4 lg:h-[60px] lg:px-6">
                <Link href="/">
                  <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
                </Link>
                Predictify<Badge className="py-0">Beta</Badge>
              </div>
            </div>
            <div className="px-0 flex gap-2">
              <NotificationsCard />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="px-4 ">
          <ViewDataTable dataset={dummyData} />
        </div>
        <div className="w-full p-4 flex items-start flex-col gap-10 pb-20">
          <div className="w-full flex gap-4">
            {stats.map((stat) => (
              <Card key={stat.id} className="w-[30%] h-[120px] shadow-none ">
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
            {/* Chart Card */}
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
            {selectedChip.type === 'string' ? (
              <>
                <div className="w-[50%] grid grid-cols-2 grid-rows-5 gap-4">
                  <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                    <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                      <Info className="h-4 w-4" /> Count
                    </span>
                    <span className="ml-6">1040</span>
                  </Card>
                </div>
              </>
            ) : (
              <div className="w-[50%] grid grid-cols-2 grid-rows-5 gap-4">
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> Count
                  </span>
                  <span className="ml-6">1040</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> Mean
                  </span>
                  <span className="ml-6">100</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Standard Deviation (std)
                  </span>
                  <span className="ml-6">10210</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Minimum (min)
                  </span>
                  <span className="ml-6">1400</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    25th Percentile (25%)
                  </span>
                  <span className="ml-6">10430</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> 50th Percentile (50%)
                  </span>
                  <span className="ml-6">107670</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> 75th Percentile (75%)
                  </span>
                  <span className="ml-6">1050</span>
                </Card>
                <Card className="w-full shadow-none flex flex-col py-2 px-4 items-start justify-center">
                  <span className="text-muted-foreground uppercase font-semibold text-xs w-full flex items-center gap-2">
                    <Info className="h-4 w-4" /> Maximum (max)
                  </span>
                  <span className="ml-6">1009990</span>
                </Card>
              </div>
            )}
          </div>
          <Alert className="bg-red-50 dark:bg-opacity-10">
            <ShieldQuestion className="h-4 w-4" />
            <AlertTitle className="uppercase">Comment</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Please note that pricing and billing terms are subject to change. Predictify reserves
              the right to discontinue or modify pricing plans, features, or billing cycles at any
              time. Changes will be communicated via email or through our website. In the event of
              any changes, you will have the option to continue or cancel your subscription as per
              our terms of service. <br /> <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consectetur
              officiis cupiditate placeat, odio voluptates! Inventore, aspernatur sit. Laudantium
              incidunt placeat ab atque magni id quos repudiandae asperiores minima pariatur, earum
              sit possimus molestias minus omnis facilis deleniti officiis. Aliquam doloribus optio
              itaque maiores repudiandae, perferendis nulla omnis recusandae ullam qui dolor
              possimus doloremque est. Quaerat ducimus corrupti placeat, minus earum ea officia
              natus culpa vel pariatur deserunt molestiae ratione cum voluptas facilis ut
              accusantium id ad similique dolore aliquid magni voluptate quis. Porro culpa molestiae
              aliquam quibusdam. Explicabo, laudantium recusandae totam deserunt saepe odit sequi.
              Esse quos ipsum sed.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default ProcessLayout;
