import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Admin Dashboard API Call
export const adminDashboardApi = async () => {
  try {
    const response = await axios.get(`${API_URL}api/admin/home`);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};
