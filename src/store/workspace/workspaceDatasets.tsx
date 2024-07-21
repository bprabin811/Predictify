// src/store/useDatasetStore.ts
import create from 'zustand';

interface Dataset {
  id: number;
  name: string;
  created_by: string;
  created_at: string;
  comments: string;
  wid: number;
}

interface DatasetState {
  datasets: Dataset[];
  addDataset: (dataset: Omit<Dataset, 'id'>) => void;
  getDatasetsByWorkspaceId: (wid: number) => Dataset[];
}

// Initial dataset
const initialDatasets: Dataset[] = [
  {
    id: 1,
    name: 'Employee.csv',
    created_by: 'John Doe',
    created_at: '2024-06-29T12:00:00Z',
    comments: 'Initial dataset creation',
    wid: 1,
  },
  {
    id: 2,
    name: 'Population.csv',
    created_by: 'Jane Smith',
    created_at: '2024-06-30T13:00:00Z',
    comments: 'Second dataset entry',
    wid: 2,
  },
  {
    id: 3,
    name: 'Corona_Spread.json',
    created_by: 'Alice Johnson',
    created_at: '2024-06-20T14:00:00Z',
    comments: 'Reviewed and updated',
    wid: 1,
  },
  {
    id: 4,
    name: 'SalesData.xlsx',
    created_by: 'Bob Brown',
    created_at: '2024-06-30T15:00:00Z',
    comments: 'Dataset for analysis',
    wid: 1,
  },
  {
    id: 5,
    name: 'CustomerFeedback.csv',
    created_by: 'Emily Davis',
    created_at: '2024-06-10T16:00:00Z',
    comments: 'Initial data collection',
    wid: 2,
  },
  {
    id: 6,
    name: 'WeatherData.json',
    created_by: 'Chris Wilson',
    created_at: '2024-07-01T17:00:00Z',
    comments: 'Merged from multiple sources',
    wid: 1,
  },
  {
    id: 7,
    name: 'MarketTrends.xlsx',
    created_by: 'Patricia Moore',
    created_at: '2024-06-16T18:00:00Z',
    comments: 'Quality checked and verified',
    wid: 1,
  },
  {
    id: 8,
    name: 'FinanceReport.pdf',
    created_by: 'Michael Taylor',
    created_at: '2024-06-25T19:00:00Z',
    comments: 'Final review pending',
    wid: 2,
  },
  {
    id: 9,
    name: 'ProductCatalog.csv',
    created_by: 'Sarah Anderson',
    created_at: '2024-06-30T20:00:00Z',
    comments: 'Updated with new products',
    wid: 2,
  },
];

// Create the Zustand store
const useDatasetStore = create<DatasetState>((set, get) => ({
  datasets: initialDatasets,
  addDataset: (dataset) =>
    set((state) => ({
      datasets: [...state.datasets, { ...dataset, id: state.datasets.length + 1 }],
    })),
  getDatasetsByWorkspaceId: (wid) => get().datasets.filter((dataset) => dataset.wid === wid),
}));

export default useDatasetStore;
