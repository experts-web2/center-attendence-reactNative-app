import {axiosInstance} from './axios';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

const url = '/user/login';
export const login = data => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then(response => {
        resolve(response);
        console.log('dsd', response);
      })
      .catch(err => reject(err));
  });
};

export const createUser = data => {
  const url = '/user/sign-up';
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getCities = () => {
  const url = '/city';
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getCenters = () => {
  const url = '/center';
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getUserRoles = () => {
  const url = '/role/role';
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getCentersByCity = id => {
  const url = `/center?city=${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const mySocket = data => {
  const socket = SocketIOClient('http://192.168.18.25:3000', {
    jsonp: false,
    transports: ['websocket'],
  });
  socket.emit('attendance', data);
  console.log('end of socket');
};
