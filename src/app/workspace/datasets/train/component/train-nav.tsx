'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const examples = [
  {
    id: 1,
    key: 'supervised',
    name: 'Supervised',
    desc: 'Algorithms that learn from labeled training data to make predictions or decisions.',
  },
  {
    id: 2,
    name: 'Unsupervised',
    key: 'unsupervised',
    desc: 'Algorithms that analyze and cluster unlabeled datasets to find hidden patterns or intrinsic structures.',
  },
  {
    id: 3,
    key: 'semiSupervised',
    name: 'Semi-Supervised',
    desc: 'Algorithms that use a small amount of labeled data and a large amount of unlabeled data for training.',
  },
  {
    id: 4,
    key: 'reinforcement',
    name: 'Reinforcement',
    desc: 'Algorithms that learn by interacting with an environment to achieve a goal, receiving feedback in the form of rewards or penalties.',
  },
  // {
  //   id: 5,
  //   key: 'neuralNetworks',
  //   name: 'Neural Networks',
  //   desc: 'Algorithms inspired by the structure and function of the brain, particularly suited for complex pattern recognition tasks.',
  // },
  // {
  //   id: 6,
  //   key: 'anomaly',
  //   name: 'Anomaly',
  //   desc: 'Algorithms designed to identify unusual patterns that do not conform to expected behavior, often used in fraud detection and fault diagnosis.',
  // },
  // {
  //   id: 7,
  //   key: 'nlp',
  //   name: 'NLP',
  //   desc: 'Algorithms and techniques for analyzing and understanding human language, used in tasks like text classification, sentiment analysis, and machine translation.',
  // },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isActive, setIsActive] = useState('supervised');

  useEffect(() => {
    const CategoryParam = searchParams.get('cat');
    if (CategoryParam) {
      setIsActive(CategoryParam);
    }
  }, [searchParams]);

  const handleNavigation = (name: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('cat', name);
    router.push(currentUrl.toString());
  };

  return (
    <div className="w-full">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn(' flex items-center gap-4', className)} {...props}>
          {examples.map((example, index) => (
            <Button
              className="rounded-full"
              onClick={() => handleNavigation(example.key)}
              key={index}
              variant={example.key === isActive ? 'secondary' : 'ghost'}>
              {example.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
