'use client';

import ViewDataTable from '@/components/processes/view';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BetweenHorizontalEnd,
  BrainCircuit,
  CircuitBoard,
  ScatterChart,
  Scaling,
  Settings,
  MessageSquareText,
  LogOut,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
// import DataAnalytics from '@/components/processes/analytics';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProcessLayout = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`http://localhost:3000/workspace`);
  };

  return (
    <main className="w-full min-h-screen">
      <div className="p-5 w-full">
        <Tabs defaultValue="data" className="w-full">
          <div className="flex items-center justify-between py-2">
            <div className="font-bold flex items-center gap-2 cursor-pointer text-xl text-primary">
              <div onClick={handleClick} className="flex items-center gap-2">
                <BrainCircuit size={24} />
                Predictify
              </div>
              <Badge variant={'outline'}>Beta</Badge>
            </div>
            <TabsList className="bg-transparent  border-none flex gap-4 items-center justify-start">
              <TabsTrigger
                value="data"
                className="p-2  data-[state=active]:bg-primary data-[state=active]:">
                <div className="flex items-center gap-2">
                  <BetweenHorizontalEnd size={16} />
                  Data
                </div>
              </TabsTrigger>
              <Separator orientation="vertical" className="" />
              <TabsTrigger
                value="visualize"
                className="p-2  data-[state=active]:bg-primary data-[state=active]:">
                <div className="flex items-center gap-2">
                  <ScatterChart size={16} />
                  Visualize
                </div>
              </TabsTrigger>
              <Separator orientation="vertical" className="" />
              <TabsTrigger
                value="engineering"
                className="p-2  data-[state=active]:bg-primary data-[state=active]:">
                <div className="flex items-center gap-2">
                  <Scaling size={16} />
                  Feature Engineering
                </div>
              </TabsTrigger>
              <Separator orientation="vertical" className="" />
              <TabsTrigger
                value="train"
                className="p-2  data-[state=active]:bg-primary data-[state=active]:">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={16} />
                  Create Model
                </div>
              </TabsTrigger>
              <Separator orientation="vertical" className="" />
              <TabsTrigger
                value="implementation"
                className="p-2  data-[state=active]:bg-primary data-[state=active]:">
                <div className="flex items-center gap-2">
                  <CircuitBoard size={16} />
                  Implementation
                </div>
              </TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'}>
                  <Settings size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-4 rounded-md shadow-lg">
                <DropdownMenuLabel className=" flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>PB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Prabin Bhatt</span>
                    <span className="font-thin">prabin.bhatt@gmail.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="  flex items-center gap-2">
                  <MessageSquareText size={16} />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="  flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="" />
          <TabsContent value="data" className="w-full  p-4">
            <ViewDataTable />
          </TabsContent>
          <TabsContent value="visualize" className="w-full  p-4">
            {/* <DataAnalytics /> */}
          </TabsContent>
          <TabsContent value="engineering" className=" p-4">
            This is your engineering.
          </TabsContent>
          <TabsContent value="train" className=" p-4">
            This is your train.
          </TabsContent>
          <TabsContent value="implementation" className=" p-4">
            This is your predict.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProcessLayout;
