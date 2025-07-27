import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_KEY = '?key=t_clark';
const ROOT_URL = '';

const useStore = create(
  devtools(
    immer((set, get) => ({
      docSlice: {
        all: [],
        current: {},

        // CRUD Functions to interact with API; state management
        fetchAllDocs: async () => {
          try {
            const response = await axios.get(`${ROOT_URL}/docs${API_KEY}`);
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

        fetchDoc: async (id) => {
          try {
            const response = await axios.get(
              `${ROOT_URL}/docs/${id}${API_KEY}`,
            );
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

        createDoc: async (doc) => {
          try {
            await axios.post(`${ROOT_URL}/docs/${API_KEY}`, doc);
            get().docSlice.fetchAllDocs();
            toast.success('Doc created!');
          } catch (error) {
            console.error('Error! Could not create doc', error);
            toast.error('Error! Could not create doc');
          }
        },

        updateDoc: async (doc) => {
          try {
            await axios.put(`${ROOT_URL}/docs/${doc.id}${API_KEY}`, doc);
            set(
              (draftState) => {
                draftState.docSlice.current = doc;
                toast.success('Doc updated!');
              },
              false,
              'docs/updateDocs',
            );
          } catch (error) {
            console.error('Error! Could not update doc', error);
            toast.error('Error! Could not update doc');
          }
        },

        deleteDoc: async (id) => {
          try {
            await axios.delete(`${ROOT_URL}/docs/${id}${API_KEY}`);
            get().docSlice.fetchAllDocs();
            toast.success('Doc deleted!');
          } catch (error) {
            console.error('Error! Could not delete doc', error);
            toast.error('Error! Could not delete doc');
          }
        },
      },
    })),
  ),
);

export default useStore;
