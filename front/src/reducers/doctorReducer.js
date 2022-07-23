import { createSlice } from "@reduxjs/toolkit";

export const doctor = createSlice({
  name: "doctor",
  initialState: {
    value: {},
  },
  reducers: {
    addDoctor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addDoctor } = doctor.actions;

export default doctor.reducer;
