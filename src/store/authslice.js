import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    avatarUri: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAvatarUri: (state, action) => {
      state.avatarUri = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.avatarUri = null;
    },
  },
});

export const { setUser, setAvatarUri, logout } = authSlice.actions;
export default authSlice.reducer;