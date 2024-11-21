import axios, { AxiosInstance } from "axios";

class BaseApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://test.vmarmysh.com",
    });
  }

  get https(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default new BaseApiService();
