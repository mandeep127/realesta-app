import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminDashboardApi,
  adminPropertyInfoApi,
  AllPropertiesApi,
  detailPropertyApi,
  getAllApi,
  getAllBuyerApi,
  getAllSellersApi,
  getAllUsersApi,
  getUserInfoApi,
  logoutAdminApi,
  updatePropertyStatusApi,
} from "./adminhApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
  propertyDetails: null,
  propertyStatus: null,
  users: [],
  usersSeller: [],
  pagination: {},
  userDetails: [],
  property: [],
};

export const AdminDashboard = createAsyncThunk(
  "adminDashboard/fetchData",
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

//AllPropertiesApi
export const FetchAllProperty = createAsyncThunk(
  "admin/fetch-properties",
  async (page, thunkAPI) => {
    try {
      const response = await AllPropertiesApi(page);
      console.log("API Response:tt", response);
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

//getAllApi
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (page, thunkAPI) => {
    try {
      const response = await getAllApi(page);
      // console.log("API Response:", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// //getAllSellersApi
// export const fetchSellerUsers = createAsyncThunk(
//   "admin/fetchSellerUsers",
//   async (page, thunkAPI) => {
//     try {
//       const response = await getAllSellersApi("Seller", page);
//       // console.log("API Response:", response);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

//getUserInfoApi
export const fetchUserInfo = createAsyncThunk(
  "admin/fetchUserInfo",
  async (id, thunkAPI) => {
    try {
      const response = await getUserInfoApi(id);
      // console.log("API Response:", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//logoutAdminApi
export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutAdminApi();
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
      //FetchAllProperty
      .addCase(FetchAllProperty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(FetchAllProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.property = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          total: action.payload.data.total,
        };
      })
      .addCase(FetchAllProperty.rejected, (state, action) => {
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
      })
      //GetUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // //fetchSellerUsers
      // .addCase(fetchSellerUsers.pending, (state) => {
      //   state.loading = true;
      //   state.error = "";
      // })
      // .addCase(fetchSellerUsers.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.usersSeller = action.payload.data.users;
      //   state.pagination = action.payload.data.pagination;
      // })
      // .addCase(fetchSellerUsers.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      //fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //AdminLogout
      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.authData = null;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminDashboardSlice.reducer;
