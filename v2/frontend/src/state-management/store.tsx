// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

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
