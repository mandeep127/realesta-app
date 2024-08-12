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

// property details
// export const adminPropertyInfoApi = async (data) => {
//   try {
//     const response = await axios.get(
//       `${API_URL}api/admin/property/${data}`,
//       data
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error in API:", error);
//     throw error;
//   }
// };

export const detailPropertyApi = async (data) => {
  try {
    const response = await axios.get(`${API_URL}api/property/${data}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

// Update property status
export const updatePropertyStatusApi = async ({ id, status }) => {
  try {
    const response = await axios.get(
      `${API_URL}api/admin/property/${id}/status/`,
      {
        params: { status }, // Pass status as a query parameter
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};
