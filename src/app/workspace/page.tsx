'use client';
import React, { useState, useEffect, Suspense } from 'react';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Settings2,
  FilePenLine,
  Trash,
  Share2,
  Link,
  FileSpreadsheet,
  Ellipsis,
  Move,
  EyeIcon,
  Copy,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import HelpMenu from '@/components/HelpMenu';
import SettingsMenu from '@/components/SettingsMenu';
import Loader from '@/components/Loader';
import { LinkShare } from '@/components/ShareLink';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Dataset } from './components/data';
import NotificationsCard from '@/components/org/Notifications';
import moment from 'moment';

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [workspace, setWorkspace] = useState<string>('Default Workspace');
  const [filteredDataset, setFilteredDataset] = useState<typeof Dataset>(
    Dataset.filter((dataset) => dataset.wid === 1),
  );

  useEffect(() => {
    const workspaceParam = searchParams.get('wsn');
    if (workspaceParam) {
      setWorkspace(workspaceParam);
    }
    const widParam = searchParams.get('wid');
    if (widParam) {
      const filtered = Dataset.filter((dataset) => dataset.wid === parseInt(widParam));
      setFilteredDataset(filtered);
    }
  }, [searchParams]);

  return (
    <WorkSpaceLayout>
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-2">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap font-semibold tracking-tight sm:grow-0">
                {workspace}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-sm cursor-pointer">
                    <Settings2 size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col">
                  <DropdownMenuItem className="flex items-center gap-3">
                    <FilePenLine size={16} />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3">
                    <Share2 size={16} />
                    Share
                  </DropdownMenuItem>
                  {workspace != 'Default Workspace' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-3">
                        <Trash size={16} className="text-red-500" />
                        Archive
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-full items-center flex gap-2">
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'default'} className="flex gap-2">
                      <Link size={16} />
                      Invite
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="flex flex-col">
                    <LinkShare />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <NotificationsCard />
              </div>
              <div>
                <SettingsMenu isLabel={false} />
              </div>
            </div>
          </div>
          <div className="mt-4 w-full flex items-center justify-end px-2">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative flex items-center">
                    <Upload size={16} className="absolute left-3" />
                    <Button variant="secondary" className="pl-10">
                      Upload dataset
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-none">
                  <DialogHeader>
                    <DialogTitle>Upload Dataset</DialogTitle>
                    <DialogDescription>
                      {"Make changes to your dataset here. Click save when you're done."}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ScrollArea className="w-full mt-4 grid grid-cols-3 gap-x-2 gap-y-2 max-h-[75vh] p-2">
            {filteredDataset.map((dataset, index) => (
              <Card className="h-[100px] shadow-none flex items-start justify-between" key={index}>
                <div className="w-[15%] h-full  flex items-start py-4 justify-center ">
                  <FileSpreadsheet />
                </div>
                <div className="w-[85%] flex flex-col px-2 py-2 items-start">
                  <div className="w-full flex items-center justify-between">
                    <Button
                      variant={'link'}
                      className="p-0 m-0"
                      onClick={() => {
                        router.push(`/workspace/datasets?id=${dataset.id}&tab=ONE`);
                      }}>
                      {dataset.name}.csv
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="py-0 px-2">
                          <Ellipsis size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="flex flex-col">
                        <DropdownMenuItem
                          className="flex items-center gap-3"
                          onClick={() => {
                            router.push(`/workspace/datasets?id=${dataset.id}&tab=ONE`);
                          }}>
                          <EyeIcon size={15} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3">
                          <FilePenLine size={15} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3">
                          <Move size={15} />
                          Move
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-3">
                          <Copy size={15} />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3">
                          <Trash size={15} className="text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <span className="text-xs">{dataset.comments}</span>
                  <span className="text-muted-foreground text-xs">
                    {moment(dataset.created_at).fromNow()}
                  </span>
                </div>
              </Card>
            ))}
          </ScrollArea>
        </div>
        <HelpMenu />
      </div>
    </WorkSpaceLayout>
  );
};

const UserDashboardWrapper: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <UserDashboard />
    </Suspense>
  );
};

export default UserDashboardWrapper;
