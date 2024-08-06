import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLoginApi } from "./adminloginApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
};

export const AdminLogins = createAsyncThunk(
  "admin/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await adminLoginApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const AdminLoginSlice = createSlice({
  name: "adminlogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AdminLogins.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AdminLogins.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(AdminLogins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminLoginSlice.reducer;
