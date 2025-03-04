import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TOKEN_STORAGE_KEY = "token";
const REFRESH_ENDPOINT = "/auth/refresh";
const UNAUTHORIZED = 401;
const MAX_RETRY_ATTEMPTS = 1;

const AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const handleRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (typeof window === "undefined") return config;

  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (accessToken) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
};

const handleResponseError = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retryCount?: number;
  };

  if (
    error.response?.status !== UNAUTHORIZED ||
    originalRequest.url === REFRESH_ENDPOINT ||
    (originalRequest._retryCount &&
      originalRequest._retryCount >= MAX_RETRY_ATTEMPTS)
  ) {
    return Promise.reject(error);
  }

  originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

  try {
    const { data } = await AxiosInstance.post<{ accessToken: string }>(
      REFRESH_ENDPOINT
    );

    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
    return AxiosInstance(originalRequest);
  } catch (refreshError) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return Promise.reject(refreshError);
  }
};

AxiosInstance.interceptors.request.use(handleRequest);
AxiosInstance.interceptors.response.use(
  (response) => response,
  handleResponseError
);

export default AxiosInstance;
