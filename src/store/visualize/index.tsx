import create from 'zustand';
import { toast } from 'sonner';
import { ApiRoutes } from '@/config/apiRoutes';
import { request } from '../ApiConfig';

interface State {
  charts: any[];
  isLoading: boolean;
  isSuccess: boolean;
  getCharts: (did: number) => Promise<void>;
}

const useChartStore = create<State>((set, get) => ({
  charts: [],
  isLoading: false,
  isSuccess: false,

  createChart: async (id: number, data: any) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', `/chart/?dataset_id=${id}`, {
        data: data,
      });
      set({ isLoading: false, isSuccess: true });
      toast.success('Chart created successfully');
      return true;
    } catch (error: any) {
      console.error('Error creating chart:', error);
      const errorMessage = error?.response?.data?.detail || 'Failed to create chart';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  getCharts: async (did: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', `${ApiRoutes.charts}/?dataset_id=${did}`);
      set({ charts: response.data, isLoading: false, isSuccess: true });
    } catch (error: any) {
      console.error('Error fetching charts:', error);
      const errorMessage = error?.response?.data?.detail || 'Failed to get charts';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },
}));

export default useChartStore;
