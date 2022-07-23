import { createSlice } from "@reduxjs/toolkit";

export const hospital = createSlice({
  name: "hospital",
  initialState: {
    value: {},
  },
  reducers: {
    addHospital: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addHospital } = hospital.actions;

export default hospital.reducer;
