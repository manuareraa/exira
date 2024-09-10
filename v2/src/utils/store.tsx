import { create } from "zustand";
import axios from "axios";

// This is the initial Zustand store for your application.
// A store contains the state variables and functions to modify the state.
interface BearStore {
  bears: number; // State variable to keep track of the bear population.
  increasePopulation: () => void; // Function to increase the number of bears.
  removeAllBears: () => void; // Function to reset the bear count.
  setBears: (newCount: number) => void; // Function to directly set the bear count.
  fetchBearsFromAPI: () => Promise<void>; // Function to fetch bear data from backend API.
}

// Create a Zustand store using the `create` function.
// It holds the state variables (bears) and methods (increasePopulation, removeAllBears, etc.) to update the state.
export const useBearStore = create<BearStore>((set) => ({
  bears: 0,

  // Increase the bear population by 1.
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),

  // Reset the bear population to 0.
  removeAllBears: () => set({ bears: 0 }),

  // Directly set the bear count to a specific number.
  setBears: (newCount: number) => set({ bears: newCount }),

  // Fetch bear population from a backend API using Axios.
  fetchBearsFromAPI: async () => {
    try {
      const response = await axios.get("https://your-api-endpoint.com/bears");
      set({ bears: response.data.bearCount }); // Update the store with the fetched bear count.
    } catch (error) {
      console.error("Error fetching bears:", error);
    }
  },
}));

// Now you can import this store in any component to get or set state.
