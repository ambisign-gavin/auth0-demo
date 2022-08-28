import axios from 'axios';
import { pathOr } from 'ramda';
import env from 'src/constants/env';

const apiCaller = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: env.NODE_ENV === 'development',
});

apiCaller.interceptors.response.use((response) => pathOr<any>({}, ['data'], response));

export default apiCaller;
