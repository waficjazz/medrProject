import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientReducer";
export default configureStore({
  reducer: {
    patient: patientReducer,
  },
});
