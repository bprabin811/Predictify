'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  FolderPlus,
  ChevronRight,
  BrainCircuit,
  Sparkles,
  Palette,
  Brackets,
  Folder,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, usePathname } from 'next/navigation';
import { Badge } from './ui/badge';
import SettingsMenu from './SettingsMenu';
import { ReportAnIssue } from './org/report-issues';

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Default Workspace' },
    { id: 2, name: "Prabin's Workspace" },
  ]);
  const [showInput, setShowInput] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const handleAddWorkspace = () => {
    setShowInput(true);
  };

  const handleWorkspaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkspaceName(event.target.value);
  };

  const HandleWorkspaceName = (id: number, name: string) => {
    router.push(`${pathname}?wid=${id}&wsn=${name}&`);
  };

  const HandleModelTestButton = () => {
    router.push(`/features/model`);
  };

  const handleAddNewWorkspace = () => {
    const newWorkspace = {
      id: workspaces.length + 1,
      name: newWorkspaceName.trim() || 'Untitled Workspace',
    };
    setWorkspaces([...workspaces, newWorkspace]);
    setShowInput(false);
    setNewWorkspaceName('');
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="border-r h-full w-[20%]">
        <ScrollArea className="w-full flex h-full justify-between gap-2 px-4">
          <div className="h-[60px] flex z-40 font-semibold text-xl gap-4 items-center">
            <Link href="/">
              <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
            </Link>
            Predictify<Badge className="py-0">Beta</Badge>
          </div>
          <div className="flex-1 pt-4">
            <aside className="grid items-start gap-5 text-sm font-medium">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                  placeholder="Search..."
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h2 className="font-normal">CREATE WORKSPACE</h2>
                <Button variant={'ghost'}>
                  <FolderPlus size={16} className="cursor-pointer" onClick={handleAddWorkspace} />
                </Button>
              </div>
              <ScrollArea className="h-[30vh]">
                {showInput && (
                  <div className="relative flex items-center mb-2">
                    <input
                      type="text"
                      className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
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
                {workspaces.map((workspace) => (
                  <Button
                    key={workspace.id}
                    variant={'ghost'}
                    onClick={() => HandleWorkspaceName(workspace.id, workspace.name)}
                    className="p-2 mb-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
                    <Folder size={16} />
                    <h3 className="font-normal">{workspace.name}</h3>
                  </Button>
                ))}
              </ScrollArea>
            </aside>
          </div>

          <div className="mt-auto">
            <Card x-chunk="dashboard-02-chunk-0" className="border-none">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
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
          </div>
          <div className="mt-2">
            <Button
              variant={'outline'}
              onClick={HandleModelTestButton}
              className="p-2 mb-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
              <Sparkles size={16} />
              <h3 className="font-normal">Model Test</h3>
            </Button>
          </div>
          <ReportAnIssue />
        </ScrollArea>
      </div>
      <ScrollArea className="h-[100vh] w-[80%]">{children}</ScrollArea>
    </div>
  );
};

export default WorkSpaceLayout;
