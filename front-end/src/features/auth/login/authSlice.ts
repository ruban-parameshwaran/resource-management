import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "@src/interface/AuthUser";
import { authService } from "@src/services/api/authService";

const userData: AuthUser = {
  token: "",
  id: null,
  email: "",
};

const initialState = {
  success: "",
  message: "",
  data: userData,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// login
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError   = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError   = false;
        state.message   = action.payload.message;        
      })
      .addCase(userLogin.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError   = true;
        state.message = action.payload;        
      });
  },
});

export default authSlice.reducer;
