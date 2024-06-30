'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

const requestData = {
  id: 1,
  title:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolor nobis exercitationem. Neque, totam fugiat corrupti accusantium dolorum commodi? Dolorem!',
  description:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim aliquid velit suscipit molestias consectetur, eaque quasi, sit, cum ea cumque deleniti recusandae iure accusamus beatae. Voluptates saepe harum dicta.',
  views: 12,
  votes: 5,
  date: '2022-12-12',
  status: 'completed',
  created_by: 'John Doe',
  image: [
    { src: '/test.png', alt: 'attachment 1' },
    { src: '/light_logo.png', alt: 'attachment 2' },
  ],
};

const RequestDetail = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  return (
    <>
      <ScrollArea className="w-full h-[85vh] flex gap-6 py-4 flex-col">
        <h4 className="font-semibold uppercase mb-4">{requestData.title}</h4>
        <div className="flex items-start gap-2">
          <div className="h-[40px] w-[40px] flex items-center bg-green-200 dark:bg-opacity-20 justify-center rounded-full">
            {requestData?.created_by?.charAt(0).toUpperCase() || 'CN'}
          </div>
          <div className="flex flex-col items-start w-full">
            <h4 className="font-semibold">{requestData?.created_by}</h4>
            <CardDescription className="text-xs">{requestData.date}</CardDescription>
            <div className="py-4 flex flex-col gap-4">
              <p className="text-muted-foreground text-[14px] font-normal">
                {requestData.description}
              </p>
              <div className="flex gap-4 items-start justify-start">
                {requestData.image.map((image, index) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={100}
                    height={150}
                    className="object-contain border cursor-pointer"
                    onClick={() => handleImageClick(image.src)}
                  />
                ))}
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  {requestData.votes}
                  <Button variant={'outline'} className="p-2">
                    <ThumbsUp size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={750}
              className="object-contain"
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestDetail;
