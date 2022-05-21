import { createSlice } from "@reduxjs/toolkit";

export const patient = createSlice({
  name: "patient",
  initialState: {
    value: {},
  },
  reducers: {
    addInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addInfo } = patient.actions;

export default patient.reducer;
