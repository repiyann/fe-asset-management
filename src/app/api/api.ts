import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    let token;

    if (typeof window === "undefined") {
      const session = await getServerAuthSession();
      token = session?.user.token;
      console.log("running on server");
    } else {
      const session = await getSession();
      token = session?.user.token;
      console.log("running on client");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new Error(error.response.data.message));
    } else {
      return Promise.reject(
        new Error(error.message || "Interval Server Error")
      );
    }
  }
);

export default api;
