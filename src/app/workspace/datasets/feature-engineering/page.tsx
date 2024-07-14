'use client';
import Loader from '@/components/Loader';
import SettingsMenu from '@/components/SettingsMenu';
import NotificationsCard from '@/components/org/Notifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart2,
  CircleCheck,
  CircleX,
  Columns,
  Diamond,
  FileCode2,
  Scaling,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SelectColumns from '../visualize/utils/SelectMultipleColumnsInXAndY';
import SelectColumnsComponent from './component/ColumnSelect';
import { dummyData } from '../components/data';
import { FeatureTransformationTools } from './component/data';
import ViewDataTable from '@/components/processes/view';
import { Separator } from '@/components/ui/separator';
import SelectMethods from './component/SelectEncodingTechnique';

const FeatureEngineering = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isColumnsSelected, setIsColumnsSelected] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('Encoding');
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);

  const getMethodsAndButtonText = (featureName: string) => {
    const feature = FeatureTransformationTools.find((tool) => tool?.name === featureName);
    if (feature) {
      return { methods: feature.methods };
    }
    return { methods: [] };
  };

  const { methods } = getMethodsAndButtonText(selectedFeature);

  const handleSelectedColumns = (columns: any[]) => {
    console.log(columns);
    if (columns.length >= 1) {
      setIsColumnsSelected(true);
      setSelectedColumns(columns);
    } else {
      setIsColumnsSelected(false);
    }
    console.log('Selected Columns:', columns);
  };

  const handleMethodClick = (selectedColumns: any[]) => {
    // Add the functionality that should be executed when the button is clicked
    console.log(`feature: ${selectedFeature}`);
  };

  const filteredFeatures = FeatureTransformationTools.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
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
        <div className="w-full h-[100vh] flex items-start justify-start">
          <div className="w-[300px] h-full flex flex-col gap-4 border-r py-4 pr-4 pb-20 overflow-auto pl-4 bg-[#fbfafa] dark:bg-[#111]">
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
            <div className="flex gap-2 w-full flex-col">
              {filteredFeatures.map((feature, index) => (
                <Button
                  key={index}
                  variant={selectedFeature === feature?.name ? 'secondary' : 'ghost'}
                  className={`flex items-center justify-between text-ls font-normal ${
                    selectedFeature === feature?.name && 'text-primary font-semibold'
                  }`}
                  onClick={() => {
                    setSelectedFeature(feature?.name);
                    setIsColumnsSelected(false); // Reset column selection when feature changes
                  }}>
                  <span className="flex items-center gap-2">
                    {feature?.icon}
                    {feature?.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full h-full p-4 flex flex-col gap-4 overflow-auto pb-20">
            <div className=" w-full flex gap-4">
              <div className="flex-1 max-w-[500px]">
                <SelectColumnsComponent
                  dataset={dummyData}
                  selectedColumns={handleSelectedColumns}
                />
              </div>
              {isColumnsSelected && (
                <div className="flex-1 max-w-[500px]">
                  <SelectMethods
                    methods={methods}
                    feature={selectedFeature}
                    selectedColumns={selectedColumns}
                  />
                </div>
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h4>Preview</h4>
              <ViewDataTable dataset={dummyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureEngineering;
