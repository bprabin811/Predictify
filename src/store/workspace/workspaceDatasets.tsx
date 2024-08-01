// src/store/useDatasetStore.ts
import create from 'zustand';
import { request } from '../ApiConfig';
import { toast } from 'sonner';

interface DatasetState {
  datasets: any[];
  isLoading: boolean;
  isSuccess: boolean;
}

// Create the Zustand store
const useDatasetStore = create<DatasetState>((set, get) => ({
  datasets: [],
  isLoading: false,
  isSuccess: false,

  postDataset: async (name: string, description: string, data: any, workspace_id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', '/dataset/', {
        data: { name, description, data, workspace_id },
      });
      const NewDataset = response.data;
      set((state) => ({
        datasets: [...state.datasets, NewDataset],
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to post dataset.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  getDatasets: async (workspace_id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', '/dataset/', { params: { workspace_id } });
      set({ datasets: response.data, isLoading: false, isSuccess: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get datasets.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  getDefaultDatasets: async () => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', '/dataset/default');
      set({ datasets: response.data, isLoading: false, isSuccess: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get default datasets.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },
}));

export default useDatasetStore;
