import axios from 'axios';
import { useParams } from 'react-router-dom';
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
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    console.log(error)
    set({error:error.response.data.message || "Error siging up", isLoading: false});
    throw error;
  }
    },

    login: async(email, password)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/login`, {email, password});
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    console.log(error)
    set({error:error.response.data.message || "Error Logging in", isLoading: false});
    throw error;
  }
    },

    verification: async(code)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/verify-email`, {code});
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: false});
    throw error;
  }
    },

    logout: async()=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/logout`);
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: false});
    throw error;
  }
    },

    forgotPassword: async(email)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/forgot-password`, {email});
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: false});
    throw error;
  }
    },

    resetPassword: async(password, params)=> {
        set({isLoading: true, error:null});
  try {
   const response =  await axios.post(`${API_URL}/reset-password/${params}`, {password});
   set({user: response.data.user, isAuthenticated: true, isLoading: false});
  } catch (error) {
    set({error:error.response.data.message || "Error verifying code", isLoading: false});
    throw error;
  }
    },

    checkAuth: async() => {
        set({isCheckingAuth: true, error:null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false, isLoading: false})
        } catch (error) {
             set({error: error.response.data.message || "error checking auth", isLoading: false, isAuthenticated: false });
             throw error;
        }
    }
}))