import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

request.interceptors.request.use((req) => {
  const token = getAccessToken();

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
