// src/store/useStore.ts
import create from 'zustand';
import { request } from '../ApiConfig';

interface State {
  workspaces: any[];
  isLoading: boolean;
  isSuccess: boolean;
  addWorkspace: (name: string) => Promise<void>;
}

// Create the Zustand store
const useWorkspaceStore = create<State>((set, get) => ({
  workspaces: [],
  isLoading: false,
  isSuccess: false,

  addWorkspace: async (name: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', '/workspace/', { data: { name } });
      const newWorkspace = response.data;
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error) {
      console.error('Add workspace error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to add workspace');
    }
  },

  getWorkspaces: async () => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', '/workspace/');
      set({ workspaces: response.data, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Get workspaces error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to get workspaces');
    }
  },
}));

export default useWorkspaceStore;
