import axios from 'axios';
import {create} from 'zustand';

const API_URL = 'http://localhost:5000/api/auth'

axios.defaults.withCredentials = true;
export const useAuthStore =  create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    

    signup: async(email, password, name)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/signup`, {email, password, name});
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    console.log(error)
    set({error:error.response.data.message || "Error siging up", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    login: async(email, password)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/login`, {email, password});
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    console.log(error)
    set({error:error.response.data.message || "Error Logging in", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    verification: async(code)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/verify-email`, {code});
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    logout: async()=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/logout`);
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    forgotPassword: async(email)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/forgot-password`, {email});
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    resetPassword: async(password, params)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/reset-password/${params}`, {password});
   set({user: response.data.user, isAuthenticated: true, isLoading: null});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: null});
    throw error;
  }
  set({isLoading: false})
    },

    checkAuth: async() => {
        set({isCheckingAuth: true, error:null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false, isLoading: null})
        } catch (error) {
             set({error: error.response.data.message || "error checking auth", isLoading: null, isAuthenticated: false });
             throw error;
        }
        set({isLoading: false})
    }
}))