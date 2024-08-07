'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Upload,
  FilePenLine,
  Trash,
  Share2,
  Link,
  FileSpreadsheet,
  Ellipsis,
  Move,
  EyeIcon,
  Copy,
  Sparkles,
  EllipsisVertical,
  Folder,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
} from '@/components/ui/dropdown-menu';
import HelpMenu from '@/components/org/HelpMenu';
import SettingsMenu from '@/components/org/SettingsMenu';
import Loader from '@/components/Loader';
import { LinkShare } from '@/components/ShareLink';
import NotificationsCard from '@/components/org/Notifications';
import moment from 'moment';
import useDatasetStore from '@/store/workspace/workspaceDatasets';
import UploadDatasetDialog from '@/components/workspace/uploadDataDialogue';
import WorkSpaceLayout from '@/components/workspace/WorkspaceLayout';
import useWorkspaceStore from '@/store/workspace';
import { Input } from '@/components/ui/input';
import MoveDialog from '@/components/workspace/MoveData';
import { ConfirmationAlert } from '@/components/utils/ConformationAlert';

const UserDashboard: React.FC = () => {
  const {
    datasets,
    getDatasets,
    getDefaultDatasets,
    deleteDataset,
    duplicateDataset,
    moveDataset,
  }: any = useDatasetStore();
  const {
    workspace,
    workspaces,
    updateWorkspace,
    getWorkspace,
    getWorkspaces,
    deleteWorkspace,
    isLoading,
    isSuccess,
  }: any = useWorkspaceStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [widNo, setWidNo] = useState(0);
  const [workspaceName, setWorkspaceName] = useState('');

  useEffect(() => {
    const workspaceParam = searchParams.get('wsn');
    if (workspaceParam) {
      setWorkspaceName(workspaceParam);
    }

    const widParam = searchParams.get('wid');
    const widNumber = parseInt(widParam ?? '', 10);
    if (widParam) {
      getDatasets(widNumber);
      getWorkspace(widNumber);
      setWidNo(widNumber);
    } else {
      getDefaultDatasets();
    }
  }, [searchParams, getDatasets, getWorkspace, getDefaultDatasets]);

  const handleModelTestButton = () => {
    router.push(`/features/model`);
  };

  const handleWorkspaceNameClick = () => {
    setIsEditing(true);
  };

  const handleWorkspaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
  };

  const handleWorkspaceNameBlur = async () => {
    setIsEditing(false);
    const success = await updateWorkspace(widNo, workspaceName);
    if (success) {
      router.push(`/workspace?wid=${widNo}&wsn=${workspaceName}`);
      getWorkspaces();
    }
  };

  // const handleDelete = () => {
  //   deleteWorkspace(widNo);
  // };

  const isEditableWorkspace = workspace !== 'Default Workspace';

  const FilteredWorkspaces = workspaces.filter(
    (workspace: any) => workspace.name !== workspaceName,
  );

  return (
    <WorkSpaceLayout>
      <div className="flex w-full mb-10">
        <div className="w-full flex flex-col gap-3">
          <div className="flex h-[80px] w-full items-center justify-between px-2 pr-4">
            <div className="flex items-center gap-4">
              {isEditing && isEditableWorkspace ? (
                <Input
                  type="text"
                  value={workspaceName}
                  onChange={handleWorkspaceNameChange}
                  onBlur={handleWorkspaceNameBlur}
                  placeholder="Default Workspace"
                  className="font-semibold focus:outline-none"
                  minLength={1}
                  autoFocus
                />
              ) : (
                <h1
                  className="flex-1 shrink-0 whitespace-nowrap font-semibold tracking-tight sm:grow-0"
                  onClick={isEditableWorkspace ? handleWorkspaceNameClick : undefined}>
                  {workspace}
                </h1>
              )}
              {isEditableWorkspace && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-sm cursor-pointer">
                      <EllipsisVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="flex flex-col">
                    <DropdownMenuItem
                      className="flex items-center gap-3"
                      onClick={handleWorkspaceNameClick}>
                      <FilePenLine size={16} />
                      Rename
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem className="flex items-center gap-3" onClick={handleDelete}>
                      <Trash size={16} className="text-red-500" />
                      Delete
                    </DropdownMenuItem> */}
                    <ConfirmationAlert
                      handleConfirm={() => {
                        deleteWorkspace(widNo);
                      }}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="h-full items-center flex gap-2">
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'link'} className="flex gap-2">
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
          <div className="mt-4 w-full flex items-center justify-between px-2 pr-4">
            <UploadDatasetDialog wid={widNo} />
          </div>
          <div className="w-full mt-10">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left text-10 uppercase tracking-wider font-semibold">
                    Dataset
                  </th>
                  <th className="py-3 px-4 border-b text-left text-10 uppercase tracking-wider font-semibold">
                    Description
                  </th>
                  <th className="py-3 px-4 border-b text-left text-10 uppercase tracking-wider font-semibold">
                    Last Modified
                  </th>
                  <th className="py-3 px-4 border-b text-left text-10 uppercase tracking-wider font-semibold">
                    Created
                  </th>
                  <th className="py-2 px-4 border-b "></th>
                </tr>
              </thead>
              <tbody>
                {datasets?.map((dataset: any, index: number) => (
                  <tr
                    key={index}
                    className="cursor-pointer dark:hover:bg-secondary/20 hover:bg-secondary text-muted-foreground">
                    <td
                      className="py-2 px-4 border-b text-12 font-normal"
                      onClick={() => {
                        router.push(`/workspace/datasets?id=${dataset?.id}&tab=ONE`);
                      }}>
                      <div className="flex gap-2 items-center underline">
                        <FileSpreadsheet size={14} />
                        {dataset?.name}
                      </div>
                    </td>
                    <td
                      className="py-2 px-4 border-b text-12 font-normal "
                      onClick={() => {
                        router.push(`/workspace/datasets?id=${dataset?.id}&tab=ONE`);
                      }}>
                      {dataset?.description}
                    </td>
                    <td
                      className="py-2 px-4 border-b text-12 font-normal "
                      onClick={() => {
                        router.push(`/workspace/datasets?id=${dataset?.id}&tab=ONE`);
                      }}>
                      {moment(dataset?.updated_at).fromNow()}
                    </td>
                    <td
                      className="py-2 px-4 border-b text-12 font-normal "
                      onClick={() => {
                        router.push(`/workspace/datasets?id=${dataset?.id}&tab=ONE`);
                      }}>
                      {moment(dataset?.created_at).fromNow()}
                    </td>
                    <td className="py-2 px-4 border-b text-12 font-normal">
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
                              router.push(`/workspace/datasets?id=${dataset?.id}&tab=ONE`);
                            }}>
                            <EyeIcon size={15} />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-3">
                            <FilePenLine size={15} />
                            Edit
                          </DropdownMenuItem>
                          {/* <MoveDialog datasetId={dataset?.id} /> */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-3">
                              <Move size={15} />
                              Move to
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {FilteredWorkspaces.map((item: any) => (
                                  <DropdownMenuItem
                                    key={item?.id}
                                    onClick={() => moveDataset(dataset?.id, item?.id)}
                                    className="flex gap-2 items-center">
                                    <Folder size={16} />
                                    <span>{item?.name}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="flex items-center gap-3"
                            onClick={() => {
                              duplicateDataset(dataset?.id);
                            }}>
                            <Copy size={15} />
                            Duplicate
                          </DropdownMenuItem>
                          <ConfirmationAlert handleConfirm={() => deleteDataset(dataset?.id)} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
