import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const adminLoginApi = async () => {
  try {
    const response = await axios.post(`${API_URL}api/admin/login`);
    return response.data;
  } catch (error) {
    console.error("Error in admin login API:", error);
    throw error;
  }
};
