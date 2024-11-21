import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError<{ data: { message: string } }>;
    return axiosError.response?.data.data.message || "";
  }
  return "Something has gone wrong";
};
