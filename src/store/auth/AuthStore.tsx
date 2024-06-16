import { create } from 'zustand';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  isLoading: false,
  isSuccess: false,
  myData: [],

  signup: async (formdata: object) => {
    set({ isLoading: true, isSuccess: false, error: null });
    try {
      const response = await axiosInstance.post('/signup', formdata);
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error creating dataset:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axiosInstance.post('/token', formData);
      const { access_token, refresh_token } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      set({ isLoggedIn: true, token: access_token, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to login');
    }
  },
  logout: async () => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axiosInstance.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      set({ isLoggedIn: false, token: null, myData: null });
    } catch (error) {
      console.error('Error logging out:', error);
      set({ isLoggedIn: null, isLoading: false, isSuccess: false });
    }
  },

  fetchMe : async()=>{
    set({ isLoading: true, isSuccess: false, error: null });
    const user = localStorage.getItem('user') || null;
    try {
      const response = await axiosInstance.get(`/users/${user}`);
      set({ myData: response.data, isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Error fetching me:', error);
      set({ isLoading: false, isSuccess: false, error: error.message });
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Refresh token not found in localStorage');
      }

      const formData = new URLSearchParams();
      formData.append('refresh_token', refreshToken);

      const response = await axiosInstance.post('/token', formData);

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      set({ token: access_token });
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new Error('Failed to refresh token');
    }
  },
}));

const existingToken = localStorage.getItem('token');
if (existingToken) {
  useAuthStore.setState({ isLoggedIn: true, token: existingToken });
}

export default useAuthStore;
