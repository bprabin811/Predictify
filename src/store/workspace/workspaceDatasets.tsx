// src/store/useDatasetStore.ts
import create from 'zustand';
import { request } from '../ApiConfig';

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
  getDatasets: async (workspace_id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', '/dataset/', { params: { workspace_id } });
      set({ datasets: response.data, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Get datasets error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to get datasets');
    }
  },

  getDefaultDatasets: async () => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', '/dataset/default');
      set({ datasets: response.data, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Get datasets error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to get datasets');
    }
  },
}));

export default useDatasetStore;
