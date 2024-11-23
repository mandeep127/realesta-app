import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  forgotPasswordApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
  resetPasswordApi,
  userProfileApi,
} from "./authApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
  register: "",
  Profile: null,
};

export const Login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginUserApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const Register = createAsyncThunk(
  "user/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await registerUserApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const Logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await logoutUserApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
});

export const ForgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (credentials, thunkAPI) => {
    try {
      const response = await forgotPasswordApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "user/resetPassword",
  async (credentials, thunkAPI) => {
    try {
      const response = await resetPasswordApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//userProfileApi
export const userProfile = createAsyncThunk(
  "user/userProfile",
  async (_, thunkAPI) => {
    try {
      const response = await userProfileApi();
      console.log("response", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (credentials, thunkAPI) => {
    try {
      const response = await changePasswordApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const loginSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.register = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = null; // Clear authData on logout
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload.authData;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload.authData;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //UserProfile
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.Profile = action.payload.data;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //changePassword
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectToken = (state) => state.users.authData;

export default loginSlice.reducer;
