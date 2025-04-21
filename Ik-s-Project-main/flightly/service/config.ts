import axios from "axios";

export const BASE_URL = "http://localhost:3000/";

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    common: {
      Accept: "*/*",
      channel: "MOBILE",
      "Content-Type": "application/json",
    },
  },
});

export type StandardResponse<T> = {
  message: string;
  data: T;
};
