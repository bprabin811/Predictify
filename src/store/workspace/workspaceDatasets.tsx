// src/store/useDatasetStore.ts
import create from 'zustand';
import { request } from '../ApiConfig';
import { toast } from 'sonner';

interface DatasetState {
  datasets: any[];
  tableData: any[];
  data_set_size: string;
  dataset_name: string;
  column_details: [];
  column_insights: [];
  graph_plots: [];
  isLoading: boolean;
  isSuccess: boolean;
  isColumnLoading: boolean;
  isColumnSuccess: boolean;
  isTableLoading: boolean;
  isTableSuccess: boolean;
}

// Create the Zustand store
const useDatasetStore = create<DatasetState>((set, get) => ({
  datasets: [],
  tableData: [],
  data_set_size: '',
  dataset_name: '',
  column_details: [],
  column_insights: [],
  graph_plots: [],
  isLoading: false,
  isSuccess: false,
  isColumnLoading: false,
  isColumnSuccess: false,
  isTableLoading: false,
  isTableSuccess: false,

  postDataset: async (
    name: string,
    description: string,
    data: any,
    data_metadata: any,
    workspace_id: number,
  ) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', '/dataset/', {
        data: { name, description, data, data_metadata, workspace_id },
      });
      const NewDataset = response.data;
      set((state) => ({
        datasets: [...state.datasets, NewDataset],
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Dataset posted successfully.');
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

  deleteDataset: async (id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      await request('delete', `/dataset/${id}`);
      set((state) => ({
        datasets: state.datasets.filter((dataset) => dataset.id !== id),
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Dataset deleted successfully.');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to delete dataset.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  duplicateDataset: async (id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', `/dataset/duplicate?dataset_id=${id}`);
      const NewDataset = response.data;
      set((state) => ({
        datasets: [...state.datasets, NewDataset],
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Dataset duplicated successfully.');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to duplicate dataset.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  moveDataset: async (id: number, workspace_id: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      await request('put', `/dataset/move?dataset_id=${id}&workspace_id=${workspace_id}`);
      set((state) => ({
        datasets: state.datasets.filter((dataset) => dataset.id !== id),
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Dataset moved to new workspace successfully.');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to move dataset.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  getTableDatas: async (id: number) => {
    set({ isTableLoading: true, isTableSuccess: false });
    try {
      const response = await request('get', `/dataset/data?dataset_id=${id}`);
      set({
        tableData: response.data['data'],
        data_set_size: response.data['data_set_size'],
        dataset_name: response.data['dataset_name'],
        column_insights: response.data['column_insights'],
        graph_plots: response.data['graph_plots'],
        isTableLoading: false,
        isTableSuccess: true,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get datasets data.';
      set({ isTableLoading: false, isTableSuccess: false });
      toast.error(errorMessage);
    }
  },

  getColumnDetais: async (id: number) => {
    set({ isColumnLoading: true, isColumnSuccess: false });
    try {
      const response = await request('get', `/dataset/column-info?dataset_id=${id}`);
      set({ column_details: response.data, isColumnLoading: false, isColumnSuccess: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get default datasets.';
      set({ isColumnLoading: false, isColumnSuccess: false });
      toast.error(errorMessage);
    }
  },

  handleMissingValues: async (id: number, type: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request(
        'put',
        `/dataset/handle-missing-value/${id}?handleType=${type}`,
      );
      set({ isLoading: false, isSuccess: true });
      toast.success('Missing values handled successfully.');
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to handle missing values.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },
}));

export default useDatasetStore;
