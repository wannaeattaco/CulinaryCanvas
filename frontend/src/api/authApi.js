import API from "./client";

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete API.defaults.headers.common.Authorization;
};

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getCurrentUser = () => API.get("/users/me");
