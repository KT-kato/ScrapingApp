import { AxiosError } from "axios";

export type responseErrorType = {
  message: string;
  status: number;
};

export const errorHandler = (error: AxiosError): responseErrorType => {
  if (error.response) {
    return {
      message: error.message,
      status: error.response.status,
    };
  } else {
    return {
      message: error.message,
      status: 500,
    };
  }
};
