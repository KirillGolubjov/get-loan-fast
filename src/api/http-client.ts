import { BAD_REQUEST, EX_SYSTEM } from '@/common/error-messages';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const httpCommon = axios.create({
  baseURL: 'https://dummyjson.com/products',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

httpCommon.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const message = error.message;

    if (!error.response || !error.response.status) {
      return Promise.reject({ message, code: '400' }); // default to 400 Bad Request
    }
    console.log(error);
    switch (error.response.status) {
      case 400:
        return Promise.reject({ message: BAD_REQUEST, code: '400' });
      case 404:
        return Promise.reject({ message: BAD_REQUEST, code: '404' });
      case 500:
        return Promise.reject({ message: EX_SYSTEM, code: '500' });
      default: //default to error 400 Bad Request
        return Promise.reject({ message, code: '400' });
    }
  }
);
