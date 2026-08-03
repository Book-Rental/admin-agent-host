import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  isVerified: boolean;
  status: string;
}

export type AppRole = "admin" | "agent" | null;

export interface AuthState {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  role: AppRole;
}

interface LoginPayload {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
    },

    setRole: (state, action: PayloadAction<AppRole>) => {
      state.role = action.payload;
    },

    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { loginSuccess, setRole, logout } = authSlice.actions;
export default authSlice.reducer;