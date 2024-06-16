// stores/usePlanStore.ts
import { create } from 'zustand';
import axiosInstance from '@/utils/axiosInstance';

interface PlanState {
  userId: string | null;
  plan: string;
  remainingDays: number;
  isLoading: boolean;
  error: string | null;
  checkPlan: () => Promise<void>;
}

const usePlanStore = create<PlanState>((set) => {
  return {
    userId: null,
    plan: 'basic',
    remainingDays: 0,
    isLoading: false,
    error: null,

    checkPlan: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axiosInstance.get('plan/check-plan');
        set({
          userId: response.data.user_id,
          plan: response.data.plan,
          remainingDays: response.data.remaining_days,
          isLoading: false,
        });
        localStorage.setItem('user', response.data.user_id);
      } catch (error) {
        console.error('Error checking plan:', error);
        set({ isLoading: false, error: error.message });
      }
    },
  };
});

export default usePlanStore;
