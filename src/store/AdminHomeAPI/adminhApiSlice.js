import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminDashboardApi } from "./adminhApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
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
      });
  },
});

export default AdminDashboardSlice.reducer;
