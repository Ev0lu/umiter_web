import { createSlice } from '@reduxjs/toolkit';

interface VisibleState {
    isVisible: boolean;
}

const initialState: VisibleState = {
  isVisible: false,
};

const isVisibleMenuSlice = createSlice({
  name: 'isVisibleMenu',
  initialState,
  reducers: {
    open: (state) => {
      state.isVisible = true;
    },
    close: (state) => {
      state.isVisible = false;
    },
  },
});

export const { open, close } = isVisibleMenuSlice.actions;
export default isVisibleMenuSlice.reducer;
