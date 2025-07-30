import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';
import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

const useStore = create(
  devtools(
    immer((set, get) => ({
      docSlice: {
        all: [],
        current: {},

        // CRUD Functions to interact with API; state management
        // Fetch all docs
        fetchAllDocs: async () => {
          try {
            const response = await axios.get(`${ROOT_URL}/docs`);
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
            const response = await axios.get(
              `${ROOT_URL}/docs/${id}`,
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

        // create document, form accepts title and pdf file
        createDoc: async (doc) => {
          try {
            const formData = new FormData();
            formData.append('title', doc.title);
            formData.append('pdf', doc.pdfFile); // this must match backend field name

            await axios.post(`${ROOT_URL}/docs/upload`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
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
            await axios.delete(`${ROOT_URL}/docs/${id}`);
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
