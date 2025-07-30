import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';
import axios from 'axios';

// const ROOT_URL = 'https://api-crammar.onrender.com/api';
const ROOT_URL = 'http://localhost:9090/api'; // for local development

const useStore = create(
  devtools(
    immer((set, get) => ({
      docSlice: {
        all: [],
        current: {},
        username: localStorage.getItem('username') || null,

        // CRUD Functions to interact with API; state management
        // Fetch all docs
        fetchAllDocs: async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${ROOT_URL}/docs`, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            set(
              (draftState) => {
                draftState.docSlice.all = response.data;
              },
              false,
              'docs/fetchAllDocs',
            );
          } catch (error) {
            console.error('Error fetching docs:', error);
            toast.error('Error fetching docs');
          }
        },

        // Fetch a single doc by ID
        fetchDoc: async (id) => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${ROOT_URL}/docs/${id}`, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            set(
              (draftState) => {
                draftState.docSlice.current = response.data;
              },
              false,
              'docs/fetchDoc',
            );
          } catch (error) {
            console.error('Error fetching the doc:', error);
            toast.error('Error fetching doc.');
          }
        },

        // create document, form accepts title and pdf file
        createDoc: async (doc) => {
          try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', doc.title);
            formData.append('pdf', doc.pdfFile);

            await axios.post(`${ROOT_URL}/docs/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            });

            get().docSlice.fetchAllDocs();
            toast.success('Doc created!');
          } catch (error) {
            console.error('Error! Could not create doc', error);
            toast.error('Error! Could not create doc');
          }
        },

        // delete document by ID
        deleteDoc: async (id) => {
          try {
            const token = localStorage.getItem('token');
            await axios.delete(`${ROOT_URL}/docs/${id}`, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            get().docSlice.fetchAllDocs();
            toast.success('Doc deleted!');
          } catch (error) {
            console.error('Error! Could not delete doc', error);
            toast.error('Error! Could not delete doc');
          }
        },

        // User authentication
        // Login and register functions - this was implemented by VS Copilot for sake of time
        loginUser: async ({ username, password }) => {
          try {
            const response = await axios.post(`${ROOT_URL}/auth/login`, {
              username,
              password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); // Save username
            set((draft) => { draft.docSlice.username = username; });
            toast.success('Login successful!');
          } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in');
          }
        },

        registerUser: async ({ username, password }) => {
          try {
            await axios.post(`${ROOT_URL}/auth/register`, { username, password });
            // Auto-login after successful registration
            const response = await axios.post(`${ROOT_URL}/auth/login`, { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); // Save username
            set((draft) => { draft.docSlice.username = username; });
            toast.success('Registration successful! You are now logged in.');
          } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
          }
        },

        logout: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          set((draft) => { draft.docSlice.username = null; });
        },
      },
    })),
  ),
);

export default useStore;
