import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string;
  email: string;
  role: "ADMIN" | "HUB_MANAGER" | "AGENT";
  status: string;
  isActive: boolean;
}

export type AppRole = "ADMIN" | "HUB_MANAGER" | "AGENT" | null;

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
      state.role = action.payload.userInfo.role;
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