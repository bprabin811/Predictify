import create from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

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
      const response = await axios.post(`http://localhost:8000/auth/login`, formData);
      const token = response.data['access_token'];
      set({ isLoggedIn: true, token, isLoading: false, isSuccess: true });

      sessionStorage.setItem('token', token);
      Cookies.set('token', token, { expires: 7 });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to login');
    }
  },

  signup: async (name: string, email: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`http://localhost:8000/auth/signup`, { name, email });
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Signup error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to signup');
    }
  },

  verify: async (email: string, otp: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`http://localhost:8000/auth/verify-otp`, { email, otp });
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Verify error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to verify');
    }
  },

  setPassword: async (email: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(`http://localhost:8000/auth/set-password`, {
        email,
        password,
      });
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Set password error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to set password');
    }
  },

  passwordResetRequest: async (email: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/reset-password-request/?email=${encodeURIComponent(email)}`,
      );
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Password reset request error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to request password reset');
    }
  },

  passwordReset: async (key: string, password: string) => {
    set({ isLoading: true, isSuccess: false });
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/reset-password/?token=${key}&new_password=${password}`,
      );
      set({ isLoading: false, isSuccess: true });
    } catch (error) {
      console.error('Password reset error:', error);
      set({ isLoading: false, isSuccess: false });
      throw new Error('Failed to reset password');
    }
  },
}));

export default useAuthStore;
