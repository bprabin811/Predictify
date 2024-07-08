import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { HistoryIcon, Plus } from 'lucide-react';
import { useState } from 'react';

interface Version {
  id: number;
  timestamp: string;
  description: string;
  data: any[];
}

interface VersionControlProps {
  versions: Version[];
  createVersion: (description: string) => void;
  restoreVersion: (id: number) => void;
}

const VersionControl: React.FC<VersionControlProps> = ({
  versions,
  createVersion,
  restoreVersion,
}) => {
  const [description, setDescription] = useState<string>('');

  const handleCreateVersion = () => {
    createVersion(description);
    setDescription('');
  };

  return (
    <div className="border rounded-[.4rem]">
      <CardHeader className="border-b">
        <h2 className="font-normal uppercase">Version Control</h2>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col gap-4 py-4">
        <h2 className="uppercase font-semibold text-xs">Create New Version</h2>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Version Description"
        />
        <Button variant={'secondary'} className="w-fit" onClick={handleCreateVersion}>
          <Plus size={16} /> Create Version
        </Button>
      </CardContent>
      <CardHeader className="border-b">
        <h2 className="font-normal uppercase">Version History</h2>
      </CardHeader>
      <CardContent className="w-full grid grid-cols-3 grid-rows-1 gap-4 py-4">
        {versions.map((version) => (
          <div key={version.id} className="mb-2 p-2 border rounded">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold">{version.timestamp}</p>
                <p className="text-xs text-muted-foreground">{version.description}</p>
              </div>
              <Button variant={'outline'} onClick={() => restoreVersion(version.id)}>
                <HistoryIcon size={16} />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default VersionControl;
