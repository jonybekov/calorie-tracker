import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:3050/api/v1/",
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
