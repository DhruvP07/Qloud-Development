import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Full base URL
const BASE_URL = "http://localhost:8000";

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/signin`, {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Network Error" };
    }
    throw { message: "An unexpected error occurred" };
  }
};

// Sign Up
export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Network Error" };
    }
    throw { message: "An unexpected error occurred" };
  }
};

// Forgot Password
export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/forgot-password/`, {
      email,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Network Error" };
    }
    throw { message: "An unexpected error occurred" };
  }

  
};

// rest password
export const resetPassword = async (
  userId: string,
  token: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/user/auth/reset-password/${userId}/${token}`,
      {
        password: newPassword,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Network Error" };
    }
    throw { message: "An unexpected error occurred" };
  }
};


// Sign Out
export const signOut = async () => {
  await AsyncStorage.removeItem("token");
};
