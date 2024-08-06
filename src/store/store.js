import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./AdminHomeAPI/adminhApiSlice";
import adminLoginReducer from "./AdminLoginAPI/adminloginApiSlice";
import loginReducer from "./authAPI/authApiSlice";
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    login: adminLoginReducer,

    //frontend
    users: loginReducer,
  },
});
