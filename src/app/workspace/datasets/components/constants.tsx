import {
  BarChart3,
  BotMessageSquare,
  BrainCircuit,
  Grid2x2Check,
  Table2,
} from 'lucide-react';

export const navBarData = [
  {
    id: 0,
    title: 'View Data',
    href: '/workspace/datasets',
    icon: <Table2 size={16} />,
    tab: 'ONE',
  },
  {
    id: 1,
    title: 'Data Visualizations',
    href: '/workspace/datasets/visualize',
    icon: <BarChart3 size={16} />,
    tab: 'TWO',
  },
  {
    id: 2,
    title: 'Feature Engineering',
    href: '/workspace/datasets/feature-engineering',
    icon: <Grid2x2Check size={16} />,
    tab: 'THREE',
  },
  {
    id: 3,
    title: 'Train',
    href: '/workspace/datasets/train',
    icon: <BrainCircuit size={16} />,
    tab: 'FOUR',
  },
  {
    id: 4,
    title: 'Playground',
    href: '/workspace/datasets/playground',
    icon: <BotMessageSquare size={16} />,
    tab: 'FIVE',
  },
];
