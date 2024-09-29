// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ubxuzhytajrlndftekqi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieHV6aHl0YWpybG5kZnRla3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NjQ0NTIsImV4cCI6MjA0MTU0MDQ1Mn0.Jw7JEA_mAdDL1pRQTckT8FKc3O_G5bLK-JUBGV7ti8c"
);

// This is the initial Zustand store for your application using immer middleware.
// A store contains the state variables and functions to modify the state immutably.
interface BearStore {
  bears: number; // State variable to keep track of the bear population.
  increasePopulation: () => void; // Function to increase the number of bears.
  removeAllBears: () => void; // Function to reset the bear count.
  setBears: (newCount: number) => void; // Function to directly set the bear count.
  fetchBearsFromAPI: () => Promise<void>; // Function to fetch bear data from backend API.
}

// Create a Zustand store using immer for immutable state updates
export const useBearStore = create<BearStore>(
  immer((set) => ({
    bears: 0,

    // Increase the bear population by 1, using immer to mutate the state immutably.
    increasePopulation: () =>
      set((state) => {
        state.bears += 1;
      }),

    // Reset the bear population to 0.
    removeAllBears: () =>
      set((state) => {
        state.bears = 0;
      }),

    // Directly set the bear count to a specific number.
    setBears: (newCount: number) =>
      set((state) => {
        state.bears = newCount;
      }),

    // Fetch bear population from a backend API using Axios.
    fetchBearsFromAPI: async () => {
      try {
        const response = await axios.get("https://your-api-endpoint.com/bears");
        set((state) => {
          state.bears = response.data.bearCount;
        });
      } catch (error) {
        console.error("Error fetching bears:", error);
      }
    },
  }))
);

// Create another store for user authentication using immer.
interface UserStore {
  isAuthenticated: boolean; // State variable to track authentication status.
  login: () => void; // Function to log in the user.
  logout: () => void; // Function to log out the user.
}

// Create a User store using immer
export const useUserStore = create<UserStore>(
  immer((set) => ({
    isAuthenticated: false,

    // Log in the user, setting `isAuthenticated` to true.
    login: () =>
      set((state) => {
        state.isAuthenticated = true;
      }),

    // Log out the user, setting `isAuthenticated` to false.
    logout: () =>
      set((state) => {
        state.isAuthenticated = false;
      }),
  }))
);

// write a store to display and hide a loading overlay
interface LoadingStore {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>(
  immer((set) => ({
    isLoading: false,
    loadingMessage: "",
    setLoading: (loading: boolean, loadingMessage: string) =>
      set((state) => {
        state.isLoading = loading;
        state.loadingMessage = loadingMessage;
      }),
  }))
);

// write a store to display and hide a wallet overlay modal
interface WalletOverlayStore {
  showWalletOverlay: boolean;
  setShowWalletOverlay: (show: boolean) => void;
}

export const useWalletOverlayStore = create<WalletOverlayStore>(
  immer((set) => ({
    showWalletOverlay: false,
    setShowWalletOverlay: (show: boolean) =>
      set((state) => {
        state.showWalletOverlay = show;
      }),
  }))
);

// Properties store (second store)
export const usePropertiesStore = create(
  immer((set) => ({
    properties: [],
    fetchProperties: async () => {
      const { setLoading } = useLoadingStore.getState(); // Access setLoading from the loading store
      try {
        setLoading(true, "Fetching properties...");

        const { data: properties_data, error } = await supabase
          .from("properties_data")
          .select("*");

        if (error) {
          throw new Error("Error fetching properties data");
        }

        console.log("Properties data:", properties_data);

        // Fetch JSON data for all properties in parallel
        const propertiesWithJSONData = await Promise.all(
          properties_data.map(async (property) => {
            const JSONFile = property.JSONFile;
            try {
              const response = await axios.get(JSONFile);
              property.JSONData = response.data;
            } catch (jsonError) {
              console.error(
                `Error fetching JSON data for property ${property.UUID}:`,
                jsonError
              );
              property.JSONData = null; // Handle missing or erroneous JSON data
            }
            return property;
          })
        );

        // Update properties in the store, resetting any previous data
        set((state) => {
          state.properties = propertiesWithJSONData;
        });

        console.log("Properties from API:", propertiesWithJSONData);

        setLoading(false, ""); // Stop loading after fetching
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false, "");
      }
    },
  }))
);
