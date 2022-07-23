import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientReducer";
import doctorReducer from "./reducers/doctorReducer";
import hospitalReducer from "./reducers/hospitalReducer";
export default configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer,
    hospital: hospitalReducer,
  },
});
