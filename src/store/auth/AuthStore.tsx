import create from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { ApiRoutes } from '@/config/apiRoutes';

const apiUrl = 'http://localhost:8000';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  isLoading: false,
  isSuccess: false,
  login: async (username: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await axios.post(`${apiUrl}/${ApiRoutes.login}`, formData);
      const token = response.data['access_token'];
      set({ isLoggedIn: true, token, isLoading: false, isSuccess: true });

      sessionStorage.setItem('token', token);
      Cookies.set('token', token, { expires: 7 });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to login.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  signup: async (name: string, email: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`${apiUrl}/${ApiRoutes.signup}`, {
        name,
        email,
      });
      set({ isLoading: false, isSuccess: true });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Signup failed. Please try again.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  verify: async (email: string, otp: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`${apiUrl}/${ApiRoutes.verify}`, {
        email,
        otp,
      });
      set({ isLoading: false, isSuccess: true });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to verify, please try again.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  setPassword: async (email: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`${apiUrl}/${ApiRoutes.setPassword}`, {
        email,
        password,
      });
      set({ isLoading: false, isSuccess: true });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.detail || 'Failed to set password, please try again.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  passwordResetRequest: async (email: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(
        `${apiUrl}/${ApiRoutes.passwordResetRequest}/?email=${encodeURIComponent(email)}`,
      );
      set({ isLoading: false, isSuccess: true });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to request password reset.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },

  passwordReset: async (key: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(
        `${apiUrl}/${ApiRoutes.passwordReset}/?token=${key}&new_password=${encodeURIComponent(
          password,
        )}`,
      );
      set({ isLoading: false, isSuccess: true });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Failed to reset password.';
      set({ isLoading: false, isSuccess: false });
      toast.error(errorMessage);
      return false;
    }
  },
}));

export default useAuthStore;
