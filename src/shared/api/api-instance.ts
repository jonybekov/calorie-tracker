import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:3000/v1/",
});

const DEFAULT_ACCESS_TOKEN = "487d9b8f-7c95-4f9a-b957-e52ab350abfa";

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

request.interceptors.request.use((req) => {
  const token = getAccessToken() || DEFAULT_ACCESS_TOKEN;

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
