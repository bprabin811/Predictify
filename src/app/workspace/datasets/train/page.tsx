'use client';
import SettingsMenu from '@/components/org/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ExamplesNav from './component/train-nav';
import NotificationsCard from '@/components/org/Notifications';
import { Card, CardFooter } from '@/components/ui/card';
import { reinforcement, semiSupervised, supervised, unsupervised } from './component/data';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

//key and data
interface Algorithm {
  key: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const Algorithms: { [key: string]: Algorithm[] } = {
  supervised: supervised,
  unsupervised: unsupervised,
  semiSupervised: semiSupervised,
  reinforcement: reinforcement,
};

const TrainPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('supervised');
  const [activeAlgorithm, setActiveAlgorithm] = useState<string | null>(null);

  useEffect(() => {
    const CategoryParam = searchParams.get('cat');
    if (CategoryParam) {
      setActiveCategory(CategoryParam);
    }

    const AlgorithmParam = searchParams.get('alg');
    if (AlgorithmParam) {
      setActiveAlgorithm(AlgorithmParam);
    }
  }, [searchParams]);

  const handleNavigation = (key: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('alg', key);
    router.push(currentUrl.toString());
  };

  const AlgorithmName = Algorithms[activeCategory].find(
    (algorithm: any) => algorithm.key === activeAlgorithm,
  )?.name;

  return (
    <div className="w-full">
      <div className="flex flex-1 gap-3 flex-col">
        <div className="py-6">
          <div className="container flex flex-col items-start">
            <Button variant={'link'} className="border-l rounded-none text-muted-foreground">
              Choose an algorithm to train your model.
            </Button>
            <h1 className="text-24 font-semibold container ">Train a Model</h1>
          </div>
        </div>

        <div className="container">
          <ExamplesNav />
        </div>
        <Separator className="mb-10" />
        <div className="container max-h-full flex items-start justify-start flex-wrap gap-4 ">
          {Algorithms[activeCategory]?.map((item, index) => (
            <Card
              className={`shadow-none max-w-[450px] h-[100px] ${
                item?.key === activeAlgorithm && 'border-primary'
              } flex hover:bg-secondary cursor-pointer }`}
              key={item?.key}
              onClick={() => handleNavigation(item?.key)}>
              <div className="w-[20%] m-4 bg-[#fbfafa]/10 rounded-md flex items-center justify-center space-x-1 space-y-1">
                {item?.icon}
              </div>
              <div className="w-[80%] p-4 flex flex-col pl-0 ">
                <span className="text-14 font-semibold text-primary ">{item?.name}</span>
                <span className="text-muted-foreground text-12">{item?.desc}</span>
              </div>
            </Card>
          ))}
        </div>
        {AlgorithmName && activeAlgorithm != null && (
          <div className="flex items-start justify-start container flex-col gap-10 py-4 mb-20">
            <div className="py-6">
              <div className="flex flex-col items-start">
                <Button variant={'link'} className="border-l rounded-none text-muted-foreground">
                  Adjust parameters before start to train your model.
                </Button>
                <h1 className="text-24 font-semibold container ">{AlgorithmName}</h1>
              </div>
            </div>
            <Card className="w-full p-4 shadow-none">
              <div className="w-full grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <Label>Select column to ignore:</Label>
                  <div className="w-full flex flex-wrap gap-2">
                    <span
                      key={'col-1'}
                      className="border py-2 px-4 rounded-md flex gap-2 items-center">
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
              <Button variant={'default'}>Train</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const TrainPageWrapper = () => (
  <Suspense fallback={<Loader />}>
    <TrainPage />
  </Suspense>
);

export default TrainPageWrapper;
