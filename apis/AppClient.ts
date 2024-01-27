import axios from "axios";

export const baseURL = `${process.env.NEXT_PUBLIC_SERVER}/api`;

export const axiosDefault = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
});
