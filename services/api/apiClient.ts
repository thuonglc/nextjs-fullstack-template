import axios from 'axios';

const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.NEXT_PUBLIC_API_URL || '/';

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (request: any) => {
    request.params = {
      ...(request.params || {}),
      // apiKey: 'api_key',
    };

    return request;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
