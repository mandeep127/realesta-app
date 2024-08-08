import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminDashboardApi,
  adminPropertyInfoApi,
  detailPropertyApi,
  updatePropertyStatusApi,
} from "./adminhApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
  propertyDetails: null,
  propertyStatus: null,
};

export const AdminDashboard = createAsyncThunk(
  "adminDashboard/fetchData", // Changed to match the slice name
  async (_, thunkAPI) => {
    try {
      const response = await adminDashboardApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//adminPropertyInfoApi
// export const AdminPropertyInfo = createAsyncThunk(
//   "adminPropertyInfo/fetchData",
//   async (id, thunkAPI) => {
//     try {
//       const response = await adminPropertyInfoApi(id);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );
//detailsPropertyApi
export const fetchDetailProperty = createAsyncThunk(
  "property/fetchDetailProperty",
  async (id, thunkAPI) => {
    try {
      const response = await detailPropertyApi(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//updatePropertyStatus
export const UpdatePropertyStatus = createAsyncThunk(
  "updatePropertyStatus/fetchData",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updatePropertyStatusApi({ id, status });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const AdminDashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(AdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDetailProperty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyDetails = action.payload;
      })
      .addCase(fetchDetailProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UpdatePropertyStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdatePropertyStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyStatus = action.payload;
      })
      .addCase(UpdatePropertyStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AdminDashboardSlice.reducer;
