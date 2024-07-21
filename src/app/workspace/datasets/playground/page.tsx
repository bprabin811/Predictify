'use client';
import NotificationsCard from '@/components/org/Notifications';
import SettingsMenu from '@/components/org/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import Link from 'next/link';

const Playground = () => {
  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-card">
            <div className="h-[60px] flex z-40 font-semibold text-xl gap-4 items-center">
              <Link href="/">
                <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
              </Link>
              Predictify<Badge className="py-0">Beta</Badge>
            </div>
            <div className="flex gap-2">
              <NotificationsCard />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-h-screen grid grid-cols-3 gap-4 grid-rows-1 p-4">
        <Card className="w-full p-4">
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label>Select column to ignore:</Label>
              <div className="w-full flex flex-wrap gap-2">
                <span key={'col-1'} className="border py-2 px-4 rounded-md flex gap-2 items-center">
                  {'Col-1'}
                  <X
                    size={16}
                    className="text-red-500 cursor-pointer"
                    // onClick={() => handleColumnRemove(col)}
                  />
                </span>
              </div>
              <Select onValueChange={() => {}} value="">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select columns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'col-1'} value={'col-1'}>
                    {'Col-1'}
                  </SelectItem>
                  <SelectItem key={'col-2'} value={'col-2'}>
                    {'Col-2'}
                  </SelectItem>
                  <SelectItem key={'col-3'} value={'col-3'}>
                    {'Col-3'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Number of epochs:</Label>
              <input type="number" className="w-full border py-2 px-4 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Batch size:</Label>
              <input type="number" className="w-full border py-2 px-4 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Learning rate:</Label>
              <input type="number" className="w-full border py-2 px-4 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Loss function:</Label>
              <Select onValueChange={() => {}} value="">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select loss function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'mse'} value={'mse'}>
                    {'Mean Squared Error'}
                  </SelectItem>
                  <SelectItem key={'mae'} value={'mae'}>
                    {'Mean Absolute Error'}
                  </SelectItem>
                  <SelectItem key={'cross_entropy'} value={'cross_entropy'}>
                    {'Cross Entropy'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Optimizer:</Label>
              <Select onValueChange={() => {}} value="">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select optimizer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'sgd'} value={'sgd'}>
                    {'Stochastic Gradient Descent'}
                  </SelectItem>
                  <SelectItem key={'adam'} value={'adam'}>
                    {'Adam'}
                  </SelectItem>
                  <SelectItem key={'rmsprop'} value={'rmsprop'}>
                    {'RMSprop'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Activation function:</Label>
              <Select onValueChange={() => {}} value="">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select activation function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'relu'} value={'relu'}>
                    {'ReLU'}
                  </SelectItem>
                  <SelectItem key={'sigmoid'} value={'sigmoid'}>
                    {'Sigmoid'}
                  </SelectItem>
                  <SelectItem key={'tanh'} value={'tanh'}>
                    {'Tanh'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Validation split:</Label>
              <input type="number" className="w-full border py-2 px-4 rounded-md" />
            </div>
          </div>
          <Button variant={'default'}>Continue</Button>
        </Card>

        <Card className="h-fit p-4">Model</Card>
        <Card className="h-fit p-4">Predictions</Card>
      </div>
    </div>
  );
};

export default Playground;
