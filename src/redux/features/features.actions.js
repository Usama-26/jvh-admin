import featuresActionTypes from "./features.types";

export function getPricingItems() {
  return { type: featuresActionTypes.GET_PRICING_ITEMS };
}
export function getPricingItemsSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_PRICING_ITEMS_SUCCESS, itemsResult };
}
export function addPricingItems(payload, callback) {
  return { type: featuresActionTypes.ADD_PRICING_ITEMS, payload, callback };
}
export function updatePricingItems(payload, id, callback) {
  return {
    type: featuresActionTypes.UPDATE_PRICING_ITEMS,
    payload,
    id,
    callback,
  };
}
export function getContacts(payload, number) {
  return { type: featuresActionTypes.GET_CONTACTS, payload, number };
}
export function getContactsSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_CONTACTS_SUCCESS, itemsResult };
}

export function getBlogs() {
  return { type: featuresActionTypes.GET_BLOGS };
}
export function getBlogsSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_BLOGS_SUCCESS, itemsResult };
}
export function addBlogs(payload, callback) {
  return { type: featuresActionTypes.ADD_BLOGS, payload, callback };
}
export function updateBlogs(payload, id, callback) {
  return {
    type: featuresActionTypes.UPDATE_BLOGS,
    payload,
    id,
    callback,
  };
}

export function getNewsletterData() {
  return { type: featuresActionTypes.GET_NEWSLETTER_DATA };
}
export function getNewsletterDataSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_NEWSLETTER_DATA_SUCCESS, itemsResult };
}
export function addNewsletter(payload, callback) {
  return { type: featuresActionTypes.ADD_NEWSLETTER, payload, callback };
}
export function updateNewsletter(payload, id, callback) {
  return {
    type: featuresActionTypes.UPDATE_NEWSLETTER,
    payload,
    id,
    callback,
  };
}

export function addGroup(payload, callback) {
  return { type: featuresActionTypes.ADD_GROUP, payload, callback };
}

export function getGroup(page) {
  return { type: featuresActionTypes.GET_GROUP, page };
}
export function getGroupSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_GROUP_SUCCESS, itemsResult };
}

export function getNewsLetter(status, page) {
  return { type: featuresActionTypes.GET_NEWSLETTER, status, page };
}
export function getNewsLetterSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_NEWSLETTER_SUCCESS, itemsResult };
}

export function getStats(page) {
  return { type: featuresActionTypes.GET_STATS, page };
}
export function getStatsSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_STATS_SUCCESS, itemsResult };
}

export function getCaptcha(page) {
  return { type: featuresActionTypes.GET_CAPTCHA, page };
}
export function getCaptchaSuccess(itemsResult) {
  return { type: featuresActionTypes.GET_CAPTCHA_SUCCESS, itemsResult };
}
