import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      const uniqueId = Math.random()*100000;
      state.push({...action.payload, uniqueId});
    },
    remove(state, action) {
      return state.filter((item) => item.uniqueId !== action.payload);
    },
    clear(state, action) {
      return state.filter((item) => item.uniqueId === item.uniqueId + 1);
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
