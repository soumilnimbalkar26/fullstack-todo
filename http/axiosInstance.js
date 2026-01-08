/**
 * Reusable axios instance for the app.
 * - Uses NEXT_PUBLIC_API_BASE_URL if set, otherwise uses local or production URL from ./http
 * - Exports: default axios instance, setAuthToken, clearAuthToken, setBaseURL
 */
import axios from "axios";
import { base_url, local_base_url } from "./http";

const defaultBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? local_base_url
  : base_url;

const instance = axios.create({
  baseURL: defaultBaseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Local in-module token cache so request interceptor can attach it
let authToken = null;

/**
 * Set the Authorization token for subsequent requests.
 * @param {string|null} token
 */
export function setAuthToken(token) {
  authToken = token;
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export function clearAuthToken() {
  authToken = null;
  delete instance.defaults.headers.common["Authorization"];
}

/**
 * Change the instance base URL at runtime (useful for tests or env override)
 * @param {string} url
 */
export function setBaseURL(url) {
  instance.defaults.baseURL = url;
}

// Attach token from module cache to each request if present
instance.interceptors.request.use(
  (config) => {
    if (authToken && config && config.headers) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize errors: attach status and data and provide a useful message
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message =
        data?.message || data?.error || error.message || "Request failed";
      const err = new Error(message);
      err.status = status;
      err.data = data;
      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
);

export default instance;
