import axios, { AxiosInstance } from "axios";

const apiAxios: AxiosInstance = axios.create({
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    withCredentials: true
  }
});

export default class ApiAxios {
  public static async get(url: string, headers: any = null) {
    const result = await apiAxios.get(url, { headers });
    return result;
  }

  public static async post(url: string, payload: any, headers: any = null) {
    const result = await apiAxios.post(url, payload, { headers });
    return result;
  }
}
