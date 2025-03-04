import api from "./apiService";
import axios, { AxiosError } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post("/user/auth/signin", { email, password });

    // Store token securely
    await AsyncStorage.setItem("token", response.data.token);

    return response.data; // Return the full response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Network Error" };
    }
    throw { message: "An unexpected error occurred" };
  }
};

export const signOut = async () => {
  await AsyncStorage.removeItem("token"); // Remove token on logout
};
