import { combineReducers } from "redux";
import auth from "./auth/auth.reducer";
import features from "./features/features.reducer";

const rootReducer = combineReducers({
  auth,
  features,
});

export default rootReducer;
