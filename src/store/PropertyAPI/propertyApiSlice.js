import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPropertyApi,
  detailsPropertyApi,
  filterPropertyApi,
  homePropertyApi,
  propertyTypeApi,
} from "./propertyApiServices";

const initialState = {
  property: null,
  status: "idle",
  error: null,
  propertyTypes: [],
  propertyHome: null,
  propertyDetails: null,
  properties: [],
};

// Async thunk for adding a new property
export const addProperty = createAsyncThunk(
  "property/addProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const data = await createPropertyApi(propertyData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyTypes = createAsyncThunk(
  "property/fetchPropertyTypes",
  async (_, thunkAPI) => {
    try {
      const response = await propertyTypeApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//homePropertyApi
export const fetchHomeProperty = createAsyncThunk(
  "property/fetchHomeProperty",
  async (_, thunkAPI) => {
    try {
      const response = await homePropertyApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//detailsPropertyApi
export const fetchDetailsProperty = createAsyncThunk(
  "property/fetchDetailsProperty",
  async (id, thunkAPI) => {
    try {
      const response = await detailsPropertyApi(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const applyFilters = createAsyncThunk(
  "filters/applyFilters",
  async (filters, thunkAPI) => {
    try {
      const response = await filterPropertyApi(filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addProperty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.property = action.payload.data;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyTypes = action.payload;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //homePropertyApi
      .addCase(fetchHomeProperty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyHome = action.payload;
      })
      .addCase(fetchHomeProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //detailsPropertyApi
      .addCase(fetchDetailsProperty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailsProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyDetails = action.payload;
      })
      .addCase(fetchDetailsProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //applyFilters
      .addCase(applyFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.properties = action.payload;
      })
      .addCase(applyFilters.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default propertySlice.reducer;
