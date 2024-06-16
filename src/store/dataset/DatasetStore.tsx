import create from 'zustand';
import axios from 'axios';

const activeStateString = localStorage.getItem('activeState');
const activeState = activeStateString ? JSON.parse(activeStateString) : {};

const useDatasetStore = create((set) => ({
  datasets: [],
  tableDatas: [],
  isActive: activeState && activeState.isActive !== undefined ? activeState.isActive : false,
  activeDatasetName:
    activeState && activeState.activeDatasetName !== undefined ? activeState.activeDatasetName : '',
  activeId: activeState && activeState.activeId !== undefined ? activeState.activeId : null,
  isLoading: false,
  isSuccess: false,
  error: null,

  // Reset is Active
  resetIsActive: () => {
    set({ isActive: false, activeDatasetName: '', activeId: null });
  },

  createDataset: async (token, userId, workspaceId, dataset) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/dataset?userId=${userId}&workspaceId=${workspaceId}`,
        dataset,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = response.data;
      const tableDatas = Object.values(data.content);
      set({ tableDatas, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error creating dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },
  fetchDatasets: async (token, userId, workspaceId) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/dataset?userId=${userId}&workspaceId=${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      set({ datasets: [...response.data['data']], isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error fetching datasets:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  fetchRecentDataset: async (token, userId, workspaceId) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/dataset/recent/?userId=${userId}&workspaceId=${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { content } = response.data;
      const tableDatas = Object.values(content);
      set({ tableDatas, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error fetching recent dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  fetchActiveDataset: async (token, userId, workspaceId) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/dataset/active/?userId=${userId}&workspaceId=${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { content } = response.data;
      const tableDatas = Object.values(content);
      set({ tableDatas, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error fetching recent dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  fetchDatasetById: async (id) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.get(`/dataset/${id}`);
      set({ datasets: [response.data], isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error fetching dataset by ID:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },
  updateDataset: async (id, dataset) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.put(`/dataset/${id}`, dataset);
      set({ datasets: [response.data], isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error updating dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  activateDataset: async (token, id, userId, workspaceId, dataset) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axios.put(
        `http://localhost:8000/dataset/active/?id=${id}&userId=${userId}&workspaceId=${workspaceId}`,
        dataset,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = response.data;
      const active_data = {
        isActive: true,
        activeDatasetName: data.dataset_name,
        activeId: data.id,
      };
      localStorage.setItem('activeState', JSON.stringify(active_data));
      set({
        isActive: true,
        activeDatasetName: data.dataset_name,
        activeId: data.id,
        isLoading: false,
        isSuccess: true,
      });
    } catch (error) {
      console.error('Error updating dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  deleteDataset: async (id, userId, workspaceId) => {
    set({ isLoading: true, isSuccess: false, error: null });
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `http://127.0.0.1:8000/dataset/${id}?userId=${userId}&workspaceId=${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error deleting dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },
}));

export default useDatasetStore;
