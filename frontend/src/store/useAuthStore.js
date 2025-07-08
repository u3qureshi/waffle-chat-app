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
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5001"
  : import.meta.env.VITE_BACKEND_URL || "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket(); // Connect socket after successful login

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    console.log("Connecting socket...");
    console.log(authUser);
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    
    set({ socket: socket }); // Store the socket instance in the state

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));