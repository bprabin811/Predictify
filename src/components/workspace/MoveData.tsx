import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Move } from 'lucide-react';
import useDatasetStore from '@/store/workspace/workspaceDatasets';
import useWorkspaceStore from '@/store/workspace';
import { DropdownMenuItem } from '../ui/dropdown-menu';

const MoveDialog: React.FC<{ datasetId: number }> = ({ datasetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { moveDataset }: any = useDatasetStore();
  const { workspaces, isLoading, isSuccess }: any = useWorkspaceStore();

  const handleMove = (workspaceId: number) => {
    moveDataset(datasetId, workspaceId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="ghost" className="w-full p-0 flex gap-3 justify-start px-2 font-normal">
          <Move size={15} />
          Move
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Dataset</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {workspaces.map((item: any) => (
            <Button key={item.id} variant="ghost" onClick={() => handleMove(item.id)}>
              {item.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveDialog;
