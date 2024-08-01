// src/store/useStore.ts
import create from 'zustand';
import { request } from '../ApiConfig';
import { toast } from 'sonner';
import { ApiRoutes } from '@/config/apiRoutes';

interface State {
  workspace: string;
  workspaces: any[];
  isLoading: boolean;
  isSuccess: boolean;
  addWorkspace: (name: string) => Promise<void>;
}

// Create the Zustand store
const useWorkspaceStore = create<State>((set, get) => ({
  workspace: 'Default Workspace',
  workspaces: [],
  isLoading: false,
  isSuccess: false,

  addWorkspace: async (name: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('post', ApiRoutes.workspace, { data: { name } });
      const newWorkspace = response.data;
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to add workspace.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  getWorkspaces: async () => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', ApiRoutes.workspace);
      set({ workspaces: response.data, isLoading: false, isSuccess: true });
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get workspaces';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  getWorkspace: async (workspaceId: number) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('get', `${ApiRoutes.workspace}${workspaceId}`);
      set({ workspace: response.data?.['name'], isLoading: false, isSuccess: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to get workspaces';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },

  updateWorkspace: async (workspaceId: number, name: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await request('put', `${ApiRoutes.workspace}${workspaceId}`, {
        data: { name },
      });
      const updatedWorkspace = response.data['name'];
      set((state) => ({
        workspace: updatedWorkspace,
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Workspace updated successfully.');
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to update workspace.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  deleteWorkspace: async (workspaceId: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      await request('delete', `${ApiRoutes.workspace}${workspaceId}`);
      set((state) => ({
        workspaces: state.workspaces.filter((workspace) => workspace.id !== workspaceId),
        isLoading: false,
        isSuccess: true,
      }));
      toast.success('Workspace deleted successfully.');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to delete workspace.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
    }
  },
}));

export default useWorkspaceStore;
