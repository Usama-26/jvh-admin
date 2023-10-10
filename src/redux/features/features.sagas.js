import FeaturesService from "../../repositories/FeaturesRepository";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import Router from "next/router";
import featuresActionTypes from "./features.types";
import { toast } from "react-toastify";
import {
  getPricingItemsSuccess,
  getContactsSuccess,
  getBlogsSuccess,
  getGroupSuccess,
  getNewsLetterSuccess,
  getStatsSuccess,
  getNewsletterDataSuccess,
  getCaptchaSuccess,
} from "./features.actions";

function* getPricingItemsSaga() {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getPricingItems);
    _items = results;
    yield put(getPricingItemsSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* getBlogsSaga() {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getBlogs);
    _items = results;
    yield put(getBlogsSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* getNewsletterDataSaga() {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getNewsletterData);
    _items = results;
    yield put(getNewsletterDataSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* addBlogsSaga(action) {
  try {
    const { results } = yield call(FeaturesService.addBlogs, action.payload);
    toast.success("Blog Added Successfully", {});
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

function* addNewsletterSaga(action) {
  try {
    const { results } = yield call(
      FeaturesService.addNewsletter,
      action.payload
    );
    toast.success("Newsletter Added Successfully", {});
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

function* updateNewsletterSaga(action) {
  try {
    const { results } = yield call(
      FeaturesService.updateNewsletter,
      action.payload,
      action.id
    );
    toast.success("Newsletter Updated Successfully", {});
    action.callback();
  } catch (error) {
    console.log("Error: ", error);
    toast.error(error, {});
  } finally {
    yield cancel();
  }
}

function* updateBlogsSaga(action) {
  try {
    const { results } = yield call(
      FeaturesService.updateBlogs,
      action.payload,
      action.id
    );
    toast.success("Blog Updated Successfully", {});
    action.callback();
  } catch (error) {
    console.log("Error: ", error);
    toast.error(error, {});
  } finally {
    yield cancel();
  }
}

function* getContactsSaga(action) {
  try {
    let _items;
    const { results } = yield call(
      FeaturesService.getContacts,
      action.payload,
      action.number
    );
    _items = results;
    yield put(getContactsSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* addPricingItemsSaga(action) {
  try {
    const { results } = yield call(
      FeaturesService.addPricingItem,
      action.payload
    );
    toast.success("Item Added Successfully", {});
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

function* updatePricingItemsSaga(action) {
  try {
    const { results } = yield call(
      FeaturesService.updatePricingItem,
      action.payload,
      action.id
    );
    toast.success("Item Updated Successfully", {});
    action.callback();
  } catch (error) {
    console.log("Error: ", error);
    toast.error(error, {});
  } finally {
    yield cancel();
  }
}

function* getGroupSaga(action) {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getGroup, action.page);
    _items = results;
    yield put(getGroupSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* getNewsLetterSaga(action) {
  try {
    let _items;
    const { results } = yield call(
      FeaturesService.getNewsLetter,
      action.status,
      action.page
    );
    _items = results;
    yield put(getNewsLetterSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}
function* getStatsSaga(action) {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getStats, action.page);
    _items = results;
    yield put(getStatsSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* getCaptchaSaga(action) {
  try {
    let _items;
    const { results } = yield call(FeaturesService.getCaptcha, action.page);
    _items = results;
    yield put(getCaptchaSuccess(_items));
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    yield cancel();
  }
}

function* addGroupSaga(action) {
  try {
    const { results } = yield call(FeaturesService.addGroup, action.payload);
    toast.success("Group Added Successfully", {});
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      toast.error(error, {});
    }
  } finally {
    yield cancel();
  }
}

export default function* rootSagas() {
  yield all([
    takeEvery(featuresActionTypes.ADD_PRICING_ITEMS, addPricingItemsSaga),
  ]);
  yield all([
    takeEvery(featuresActionTypes.UPDATE_PRICING_ITEMS, updatePricingItemsSaga),
  ]);
  yield all([
    takeEvery(featuresActionTypes.GET_PRICING_ITEMS, getPricingItemsSaga),
  ]);
  yield all([takeEvery(featuresActionTypes.GET_CONTACTS, getContactsSaga)]);
  yield all([takeEvery(featuresActionTypes.GET_BLOGS, getBlogsSaga)]);
  yield all([takeEvery(featuresActionTypes.ADD_BLOGS, addBlogsSaga)]);
  yield all([takeEvery(featuresActionTypes.UPDATE_BLOGS, updateBlogsSaga)]);
  yield all([takeEvery(featuresActionTypes.ADD_GROUP, addGroupSaga)]);
  yield all([takeEvery(featuresActionTypes.GET_GROUP, getGroupSaga)]);
  yield all([takeEvery(featuresActionTypes.GET_NEWSLETTER, getNewsLetterSaga)]);
  yield all([takeEvery(featuresActionTypes.GET_STATS, getStatsSaga)]);
  yield all([
    takeEvery(featuresActionTypes.GET_NEWSLETTER_DATA, getNewsletterDataSaga),
  ]);
  yield all([takeEvery(featuresActionTypes.ADD_NEWSLETTER, addNewsletterSaga)]);
  yield all([
    takeEvery(featuresActionTypes.UPDATE_NEWSLETTER, updateNewsletterSaga),
  ]);
  yield all([takeEvery(featuresActionTypes.GET_CAPTCHA, getCaptchaSaga)]);
}
