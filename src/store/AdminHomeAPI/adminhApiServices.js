import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin Dashboard API Call
export const adminDashboardApi = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}api/admin/home`);

    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};
// all properties
export const AllPropertiesApi = async (page) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}api/admin/properties?page=${page}`
    );
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
    const response = await axiosInstance.get(
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
    const response = await axiosInstance.get(
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
    const response = await axiosInstance.get(`${API_URL}api/admin/users`);
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
    const response = await axiosInstance.get(`${API_URL}api/admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

// logout
export const logoutAdminApi = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}api/admin/logout`);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

export const adminProfileApi = async (data) => {
  try {
    const response = await axiosInstance.get(`${API_URL}api/admin-profile`);
    return response.data;
  } catch (error) {
    console.error("Error in admin API:", error);
    throw error;
  }
};

export const changePasswordAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}api/change-password`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in Change Password API:", error);
    throw error;
  }
};
