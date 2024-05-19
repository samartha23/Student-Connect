import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSidebar: false,
};

const sidebarSlice = createSlice({
  name: "kanbanSidebar",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
  },
});

export const { setOpenSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
