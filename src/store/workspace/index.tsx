// src/store/useStore.ts
import create from 'zustand';

// Define the state interface
interface Workspace {
  id: number;
  name: string;
}

interface State {
  workspaces: Workspace[];
  loading: boolean;
  addWorkspace: (name: string) => void;
  getWorkspaces: () => Workspace[];
}

// Create the Zustand store
const useWorkspaceStore = create<State>((set, get) => ({
  workspaces: [
    { id: 1, name: 'Default Workspace' },
    { id: 2, name: "Prabin's Workspace" },
  ],
  loading: false,
  addWorkspace: (name: string) =>
    set((state) => ({
      workspaces: [...state.workspaces, { id: state.workspaces.length + 1, name }],
    })),
  getWorkspaces: () => get().workspaces,
}));

export default useWorkspaceStore;
