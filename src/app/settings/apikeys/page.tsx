import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Archive, Delete, Edit, Key, Plus, Trash } from 'lucide-react';
import AlertBox from '@/components/utils/AlertBox';

// Dummy API key data
const apiKeyData = [
  {
    apiKey: 'Pdy-4567890abcdef1234567890abcdef',
    name: 'test',
    created_at: '2024-06-28T12:34:56Z',
    created_by: 'Prabin Bhatta',
    permissions: ['read', 'write', 'delete'],
  },
  {
    apiKey: 'Pdy-6543210abcdef9876543210abcdef',
    name: 'dummy-key',
    created_at: '2024-06-29T08:45:30Z',
    created_by: 'Jane Doe',
    permissions: ['read', 'write'],
  },
];

export default function SettingsProfilePage() {
  return (
    <>
      <h3 className="text-lg font-medium">API keys</h3>
      <p className="text-sm text-muted-foreground">
        This API key is used for all requests to the Predictify API. As an owner of this project,
        you can view and manage all API keys in this project.
      </p>
      <Separator className="my-4" />
      <AlertBox
        icon={<Key className="h-4 w-4" />}
        title="Alert"
        description="Do not share your API key with others, or expose it in the browser or other client-side
          code. In order to protect the security of your account, Predictify may also automatically
          disable any API key that has leaked publicly."
      />

      <div className="w-full flex items-center justify-end">
        <Button variant={'outline'} className="flex gap-2 items-center">
          <Plus size={20} />
          <span>Create a new API key</span>
        </Button>
      </div>
      <div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Name</th>
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Key</th>
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Created At</th>
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Created By</th>
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Permissions</th>
              <th className="py-2 px-4 uppercase font-normal text-xs text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeyData.map((keyData, index) => (
              <tr key={index}>
                <td className="py-2 px-4 font-thin ">{keyData.name}</td>
                <td className="py-2 px-4 font-thin">{`${keyData.apiKey.substring(
                  0,
                  6,
                )}*******`}</td>
                <td className="py-2 px-4 font-thin">
                  {new Date(keyData.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-2 px-4 font-thin">{keyData.created_by}</td>
                <td className="py-2 px-4 font-thin">{keyData.permissions.join(', ')}</td>
                <td className="py-2 px-4 font-thin flex gap-2 items-center">
                  <Button variant={'secondary'}>
                    <Edit size={15} />
                  </Button>
                  <Button variant={'secondary'}>
                    <Trash size={15} className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
