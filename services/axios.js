import axios from 'axios';
import {API_BASE_URL} from '../constants/BaseUrl'
import AsyncStorageManager from '../Managers/AsyncStorageManager';
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
axiosInstance.interceptors.request.use (async function (config) {
  const authToken = await AsyncStorageManager.getDataValue('token').then((token) => {
    return token
  })
  const token = `Bearer ${authToken}`;
  config.headers.Authorization = token;
  console.log('token233223232', token);
  return config;
});
