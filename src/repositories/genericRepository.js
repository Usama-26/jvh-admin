import axios from "axios";
// const baseDomain = "https://cryomadness.com/api";
const baseDomain = "http://localhost:4000/api";

export const appName = "JVH-ADMIN";

export const customHeaders = {
  Accept: "application/json",
  "content-type": "application/json",
};

export const baseUrl = `${baseDomain}`;
const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export const getError = (error) => {
  if (error.response) {
    if (error?.response?.data?.data?.errorMessage) {
      return `${error.response.data.data.errorMessage}`;
    } else if (error?.response?.data?.message) {
      return `${error.response.data.message}`;
    } else {
      return error.response;
    }
  } else if (error.request) {
    return error.message;
  } else {
    return `${error}`;
  }
};

export async function getStorageDetails() {
  try {
    const request = await axios.get(`${baseDomain}/generic/storage`);
    const { data } = request;
    return { result: data };
  } catch (error) {
    throw getError(error);
  }
}
