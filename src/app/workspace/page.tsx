'use client';
import React, { useState, useEffect, ChangeEvent, Suspense } from 'react';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import { Button } from '@/components/ui/button';
import { Upload, Settings2, FilePenLine, Trash, CopyX, Share2, Link } from 'lucide-react';
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

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [workspace, setWorkspace] = useState<string>('Default Workspace');

  useEffect(() => {
    const workspaceParam = searchParams.get('wsn');
    if (workspaceParam) {
      setWorkspace(workspaceParam);
    }
  }, [searchParams]);

  return (
    <WorkSpaceLayout>
      <div className="flex flex-1 gap-3 flex-col">
        <div className="flex-[7] flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-3">
                    <Trash size={16} />
                    Archive
                  </DropdownMenuItem>
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
              <div className="">
                <SettingsMenu isLabel={false} />
              </div>
            </div>
          </div>
          <div className="mt-4 w-full flex items-center justify-end">
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
          <div className="mt-4 flex font-normal gap-4 flex-wrap">
            <div className="h-[60vh] w-full flex items-center justify-center">
              <Loader /> {' Loading datasets...'}
            </div>
            <div className="w-full hidden items-center justify-center flex-col gap-4">
              <div className=" bg-red-100 dark:bg-gray-600 h-20 w-20 flex items-center justify-center rounded-full ">
                <CopyX
                  size={40}
                  style={{
                    animation: 'rotateIcon 3s infinite',
                  }}
                />
                <style>{`
                    @keyframes rotateIcon {
                      0% {
                        transform: rotate(0deg);
                      }
                      50% {
                        transform: rotate(30deg);
                      }
                      100% {
                        transform: rotate(0deg);
                      }
                    }
                  `}</style>
              </div>
              <span className="text-md text-muted-foreground tracking-tight">
                You have no datasets
              </span>
            </div>
          </div>
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
