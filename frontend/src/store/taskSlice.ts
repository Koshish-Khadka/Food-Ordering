import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    input: [],
  },
  reducers: {
    handleClear: (state, action) => {},
  },
});

// export const { setProducts } = productSlice.actions;

export default taskSlice.reducer;
