import axios, { AxiosRequestConfig } from "axios";
import path from "path";

export const GetAPI = async (url: string, options: AxiosRequestConfig = {}) => {
  try {
    const response = await axios({
      method: "get",
      url: path.join(process.env.API_URL, url),
      ...options,
    });
    return {
      response: response,
      error: null,
    };
  } catch (error) {
    return {
      response: undefined,
      error: error,
    };
  }
};

export const PostAPI = async (
  url: string,
  payload: any,
  options: AxiosRequestConfig = {}
) => {
  try {
    const response = await axios({
      method: "post",
      url: path.join(process.env.API_URL, url),
      data: payload,
      ...options,
    });
    return {
      response: response,
      error: null,
    };
  } catch (error) {
    return {
      response: undefined,
      error: error,
    };
  }
};
