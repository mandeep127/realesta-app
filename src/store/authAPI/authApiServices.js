import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  },
});

export const loginUserApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}api/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error in Login API:", error);
    throw error;
  }
};

export const registerUserApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}api/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error in Register API:", error);
    throw error;
  }
};

export const logoutUserApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL}api/logout`);
    return response;
  } catch (error) {
    console.error("Error in Logout API:", error);
    throw error;
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}api/forget-password`, data);
    return response.data;
  } catch (error) {
    console.error("Error in Forgot Password API:", error);
    throw error;
  }
};

export const resetPasswordApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}api/reset-password/`, data);
    return response.data;
  } catch (error) {
    console.error("Error in reset Password API:", error);
    throw error;
  }
};

export const userProfileApi = async (data) => {
  try {
    const response = await axiosInstance.get(`${API_URL}api/profile`);
    return response.data;
  } catch (error) {
    console.error("Error in reset Password API:", error);
    throw error;
  }
};
