//Zustand is a lightweight, fast, and scalable state management library 
// for React. It offers a simple, intuitive API to manage application state, making it a popular choice as an alternative to more complex libraries like Redux. 
// Zustand's core concept is a "store," which encapsulates the state and the actions that modify it. This store-centric approach simplifies state management compared to traditional methods. 
// With zustand, we can create a store to manage authentication state
// Props = function arguments
// State = local variables 
// Props vs State:
// - Props are passed to components and are immutable within the component.
// - State is managed within the component and can be changed using setState or similar methods.
// - A component's state can change over time; whenever it changes, the component re-renders.

/*Zustand:
Scope:
Used for managing global or shared state across multiple components.
Purpose:
To provide a centralized store for application data that needs to be accessed and modified by various parts of the application.
Usage:
It uses hooks for accessing and updating the state. It does not rely on React Context API.
Benefits:
Simplifies state management for complex applications by avoiding prop drilling. It has a simple and intuitive API.*/
import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            // Assuming axiosInstance is already defined [lib/axios.js] and configured with the base URL (http:localhost:5001/api)
            const response = await axiosInstance.get('/auth/check');
            // If the request is successful, set the authUser state with the user data
            // This will be called when the app loads or refreshes to check if the user is authenticated
            set({ authUser: response.data });
        } catch (error) {
            // If there's an error (e.g., user is not authenticated), set authUser to null
            set({ authUser: null });
            console.error("Error checking authentication:", error);
        } finally {
            // Regardless of success or failure, set isCheckingAuth to false
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data});
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create account");
        } finally{
            set({ isSigningUp: false });
        }   

    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data.user });
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to log in");
        } finally {
            set({ isLoggingIn: false });
        }

    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to log out");
            
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            console.log("Profile updated successfully:", response.data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));