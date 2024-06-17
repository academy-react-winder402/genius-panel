import axios from "axios";
import toast from "react-hot-toast";

import { getItem, removeItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  if (err.response?.status === 401) {
    toast.error("لطفا وارد شوید !");

    removeItem("token");

    window.location.pathname = "/login";
  }

  if (err?.response?.status >= 400 && err?.response.status < 500) {
    alert("Client Error: ", err?.response.status);
  }

  Promise.reject(err);
};

instance.interceptors.request.use((opt) => {
  const token = getItem("token");

  if (token && token !== null) opt.headers.Authorization = `Bearer ${token}`;
  return opt;
});
instance.interceptors.response.use(onSuccess, onError);

export default instance;
