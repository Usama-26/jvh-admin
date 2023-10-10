import actionTypes from "./auth.actionTypes";

export function loginRequest(payload, callback) {
  return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}

export function userSignUpRequest(payload, callback) {
  return { type: actionTypes.USER_SIGNUP_REQUEST, payload, callback };
}

export function updateUser(payload, id, callback) {
  return { type: actionTypes.UPDATE_USER, payload, id, callback };
}

export function getUsers(page, role, status, value, status2, value2) {
  return {
    type: actionTypes.GET_USERS,
    page,
    role,
    status,
    value,
    status2,
    value2,
  };
}

export function getUsersSuccess(results) {
  return { type: actionTypes.GET_USERS_SUCCESS, results };
}

export function loginSuccess(user, token) {
  return { type: actionTypes.LOGIN_SUCCESS, user, token };
}

export function getUser(id) {
  return { type: actionTypes.GET_USER, id };
}
export function getUserSuccess(results) {
  return { type: actionTypes.GET_USER_SUCCESS, results };
}

export function updateSuccess(results) {
  return { type: actionTypes.UPDATE_SUCCESS, results };
}
export function updateAuthUser(data) {
  return { type: actionTypes.UPDATE_LOGIN_USER, data };
}

export function signUpSuccess() {
  return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOutRequest(payload, callback) {
  return { type: actionTypes.LOGOUT, payload, callback };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function forgotpasswordrequests(payload, callback) {
  return {
    type: actionTypes.FORGOTPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function resetPasswordRequests(payload, callback) {
  return {
    type: actionTypes.RESETPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function verifyEmail(payload, callback) {
  return {
    type: actionTypes.VERIFY_EMAIL,
    payload,
    callback,
  };
}
export function contactUs(payload, callback) {
  return {
    type: actionTypes.CONTACT_US,
    payload,
    callback,
  };
}

export function sendInvite(payload, callback) {
  return { type: actionTypes.SEND_INVITE, payload, callback };
}
