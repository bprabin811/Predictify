'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, FolderPlus, Folder, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, usePathname } from 'next/navigation';
import { Badge } from '../ui/badge';
import useWorkspaceStore from '@/store/workspace';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Skeleton } from '../ui/skeleton';

interface Workspace {
  id: number;
  name: string;
}

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  const { workspaces, addWorkspace, isLoading, isSuccess, getWorkspaces }: any =
    useWorkspaceStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isProActive, setIsProActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [showInput, setShowInput] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  useEffect(() => {
    getWorkspaces();
  }, []);

  console.log(isLoading);

  const handleAddWorkspace = () => {
    setShowInput(true);
  };

  const handleWorkspaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkspaceName(event.target.value);
  };

  const HandleWorkspaceName = (id: number, name: string) => {
    router.push(`${pathname}?wid=${id}&wsn=${name}&`);
  };

  const handleAddNewWorkspace = () => {
    const newWorkspace = newWorkspaceName.trim() || 'Untitled Workspace';
    addWorkspace(newWorkspace);
    setShowInput(false);
    setNewWorkspaceName('');
  };

  const filteredWorkspaces = workspaces.filter((workspace: Workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex w-screen h-screen items-center justify-center ">
      <div className=" border-r h-full md:w-[250px] xl:w-[280px] overflow-visible bg-[#fbfafa] dark:bg-card ">
        <aside className="flex flex-col px-4 h-full pb-4">
          <div className="h-[80px] flex z-40 font-semibold text-16 gap-4 items-center">
            <Link href="/">
              <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
            </Link>
            Predictify<Badge className="py-0">Beta</Badge>
          </div>
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3" />
            <input
              type="text"
              className="pl-10 pr-4 py-1.5 w-full border rounded-md focus:outline-none focus:border-transparent font-normal text-12"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-4 flex items-center justify-between mb-2">
            <h2 className="font-normal text-14 text-green-600">CREATE WORKSPACE</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'ghost'} className="relative ">
                    <FolderPlus size={16} className="cursor-pointer" onClick={handleAddWorkspace} />
                    {/* <span className="absolute animate-ping inline-flex duration-[5000] h-4 w-4 rounded-full bg-sky-400 opacity-75"></span> */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="flex items-start flex-col justify-center gap-2">
                  <h2 className="text-16">Create a Workspace</h2>
                  <p className="text-12">Click the button to create a new workspace</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex-1 flex flex-col gap-4  ">
            <div className="flex-1 overflow-scroll">
              {showInput && (
                <div className="relative flex items-center mb-2">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal text-12"
                    placeholder="Untitled Workspace"
                    value={newWorkspaceName}
                    onChange={handleWorkspaceNameChange}
                    onBlur={handleAddNewWorkspace}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddNewWorkspace();
                      }
                    }}
                  />
                </div>
              )}
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-full rounded-md mb-2" />
                  <Skeleton className="h-10 w-full rounded-md mb-2" />
                  <Skeleton className="h-10 w-full rounded-md mb-2" />
                </>
              ) : (
                filteredWorkspaces.map((workspace: Workspace) => (
                  <Button
                    key={workspace.id}
                    variant={'outline'}
                    onClick={() => HandleWorkspaceName(workspace.id, workspace.name)}
                    className="p-2 mb-2 w-full flex items-center justify-start gap-4 rounded-md cursor-pointer">
                    <Folder size={16} />
                    <h3 className="font-normal text-12">{workspace.name}</h3>
                  </Button>
                ))
              )}
            </div>
            <div className="flex-1 flex flex-col justify-end items-end">
              {!isProActive && (
                <Card x-chunk="dashboard-02-chunk-0" className="relative">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <Button
                      variant={'ghost'}
                      className="absolute right-0 top-0 w-10 h-10 p-0 rounded-full"
                      onClick={() => {
                        setIsProActive(!isProActive);
                      }}>
                      <X size={16} className="text-red-500" />
                    </Button>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription className="text-14 text-muted-foreground font-normal">
                      Unlock all features and get unlimited access to our support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Link href={'/settings/plans'}>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </aside>
      </div>
      <div className="h-[100vh] flex-1 ">{children}</div>
    </div>
  );
};

export default WorkSpaceLayout;
