import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

AxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

AxiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const responce = await axios.post<{ accessToken: string }>(
          `${API_URL}/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", responce.data.accessToken);
        return AxiosInstance.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован: ", error);
        window.location.href = "/";
      }
    }
    throw error;
  }
);
export default AxiosInstance;
