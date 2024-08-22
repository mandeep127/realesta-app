import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Fetch all property types
export const propertyTypeApi = async (data) => {
  try {
    const response = await axios.get(`${API_URL}api/property-types`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch property types :", error);
    throw error;
  }
};

//fetch property by filters
// export const filterProperty = async (filters) => {
//   try {
//     const response = await axios.get(`${API_URL}api/property`, {
//       params: filters,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to filter properties :", error);
//     throw error;
//   }
// };

//fetch home property
export const homePropertyApi = async (data) => {
  try {
    const response = await axios.get(`${API_URL}api/home`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch home property :", error);
    throw error;
  }
};

// Create property
export const createPropertyApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}api/add-property`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

//for detail property page
export const detailsPropertyApi = async (data) => {
  try {
    const response = await axios.get(`${API_URL}api/property/${data}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

// filter properties
export const filterPropertyApi = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}api/filter-properties`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};
