import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';
import {useAuthStore} from './useAuthStore';

export const useChatStore = create((set, get) => ({
  messages: [], // Update in real time when a new message is sent or received
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Subscribe to new messages from the server
  // This will be called when a user selects a chat
  // and will listen for new messages from that user
  // It will update the messages state when a new message is received
  // It will also ensure that the messages are only updated if the message is sent from the selected user
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    // Get the socket instance from the auth store
    // This is the socket instance that is connected to the server
    // It is used to listen for new messages from the server
    // The socket instance is created when the user logs in
    // and is stored in the auth store state
    const socket = useAuthStore.getState().socket;

    // Listen for new messages from the server
    // The server will emit a "newMessage" event when a new message is sent
    // The new message will be passed as an argument to the callback function
    // The callback function will update the messages state with the new message
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return; // Only update the messages state if the message is sent from the selected user

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage"); // Unsubscribe from the "newMessage" event to avoid memory leaks
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }), // Set the selected user for the chat
}));