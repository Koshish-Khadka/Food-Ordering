import axios from "axios";

// This is unauthenticated api
export const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    // jaba hami form, Image haru ma jancham tyo bela multipart/form ma pathauchan content type lai
    Accept: "application/json",
  },
});

// This is authenticated api
// export const APIAuthenticated = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `${localStorage.getItem("token")}`,
//   },
// });
export const APIAuthenticated = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach token dynamically on every request
APIAuthenticated.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
      // or (recommended):
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
