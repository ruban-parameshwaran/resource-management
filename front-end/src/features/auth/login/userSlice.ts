import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@src/interface/AuthUser";

const initialState: AuthUser = {
  id: null,
  token: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    clearAuthUser: (state) => {
      (state.email = ""), (state.id = null), (state.token = "");
    },
  },
});

export const { setAuthUser, clearAuthUser } = userSlice.actions;
export default userSlice.reducer;
