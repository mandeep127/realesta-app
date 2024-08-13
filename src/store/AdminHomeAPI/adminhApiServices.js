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
// all properties
export const AllPropertiesApi = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/admin/properties`);
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
    const response = await axios.get(
      `${API_URL}api/admin/property/${data}`,
      data
    );
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

// Fetch user
export const getAllApi = async () => {
  try {
    const response = await axios.get(`${API_URL}api/admin/users`);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

// Fetch Seller user
// export const getAllSellersApi = async () => {
//   try {
//     const response = await axios.get(`${API_URL}api/admin/users/Seller`);
//     return response.data;
//   } catch (error) {
//     console.error("Error in API:", error);
//     throw error;
//   }
// };

// fetch specified user information
export const getUserInfoApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}api/admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};
