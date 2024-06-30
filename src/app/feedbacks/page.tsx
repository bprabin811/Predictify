'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button'; // Import Button component
import { useState } from 'react'; // Import useState for handling the file input
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription } from '@/components/ui/card';
import { BarChart2, Eye, Search, ThumbsUp } from 'lucide-react';
import { dummyFeatureData } from './components/data';
import { useRouter } from 'next/navigation';

const FeedBackPage = () => {
  const [file, setFile] = useState(null); // State to handle file input
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files.length > 0) {
    //   setFile(e.target.files[0]);
    // }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };

  const viewRequest = (id: string) => {
    router.push(`/feedbacks/request?id=${id}`);
  };

  return (
    <div className="w-full flex gap-6 py-4">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="font-semibold">Feature Request</h1>

        <div className="grid gap-2">
          <Input id="subject" placeholder="I need..." />
        </div>

        <div className="grid gap-2">
          <Textarea
            id="description"
            rows={8}
            className="resize-none"
            placeholder="Please include all information relevant to your request."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="attachment">Attachment</Label>
          <Input type="file" id="attachment" onChange={handleFileChange} />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
      <div className="flex-1 ">
        <div className="w-full flex items-center justify-between px-4">
          <h1 className="font-semibold">Recent Requests</h1>
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3" />
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
              placeholder="Search..."
            />
          </div>
        </div>
        <ScrollArea className="h-[75vh] w-full p-4">
          {dummyFeatureData.map((request) => (
            <Card key={request.id} className="shadow-none w-full p-4 flex gap-2 mb-4">
              <div className="w-10 h-10 flex rounded-full bg-green-200 dark:bg-opacity-10 items-center justify-center">
                {request.title.charAt(0)}
              </div>
              <div className="w-[90%] flex items-start justify-center flex-col gap-2">
                <strong className="uppercase">{request.title}</strong>
                <div
                  className={`${
                    request?.status === 'completed'
                      ? 'bg-green-200'
                      : request?.status === 'in progress'
                      ? 'bg-yellow-200'
                      : 'bg-blue-200'
                  } dark:bg-opacity-50 rounded-md flex items-center justify-center px-2 py-1 text-xs font-semibold`}>
                  {request.status}
                </div>
                <CardDescription>{request.description}</CardDescription>

                <div className="w-full flex items-center justify-between">
                  <Button
                    variant={'secondary'}
                    className="flex gap-2 items-center"
                    onClick={() => viewRequest(request?.id)}>
                    <Eye size={16} /> View
                  </Button>
                  <div className="flex gap-2 items-center">
                    {request.votes}
                    <Button variant={'outline'} className="p-2">
                      <ThumbsUp size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default FeedBackPage;
