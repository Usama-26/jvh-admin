import { all } from "redux-saga/effects";
import AuthSagas from "./auth/auth.saga";
import FeaturesSagas from "./features/features.sagas";

export default function* rootSaga() {
  yield all([AuthSagas(), FeaturesSagas()]);
}
