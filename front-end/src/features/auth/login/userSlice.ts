import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@src/interface/AuthUser";

const initialState: AuthUser = {
  id: null,
  token: "",
  email: "",
  isUserLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
    },
    clearAuthUser: (state) => {
      (state.email = ""), 
      (state.id = null), 
      (state.token = ""),
      (state.isUserLoggedIn = false);
    },
  },
});

export const { setAuthUser, clearAuthUser } = userSlice.actions;
export default userSlice.reducer;
