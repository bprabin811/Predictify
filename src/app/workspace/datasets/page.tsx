'use client';
import SettingsMenu from '@/components/SettingsMenu';
import ViewDataTable from '@/components/processes/view';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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

const ProcessLayout = () => {
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
            <div className="px-4">
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <ViewDataTable dataset={dummyData} />
        </div>
      </div>
    </div>
  );
};

export default ProcessLayout;
