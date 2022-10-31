import {axiosInstance} from './axios';

export const getAttendance = ({userRole, offset}) => {
  let url = '/attendance';
  if (userRole) url = url + '?center=' + userRole + '&offset=' + offset;
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const createAttendance = data => {
  const url = '/attendance';
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getUserRolesByCityCenter = (centerId, cityId) => {
  console.log('called123', centerId, cityId);
  const url = '/user/getRole';

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, {centerId, cityId})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getUserFilterationData = (
  city,
  center,
  cityManager,
  selectCenterManager,
) => {
  const url = '/filter-attendance';
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, {city, center, cityManager, selectCenterManager})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const geAttendenciesRecord = cityManager => {
  console.log('cityManager', cityManager);
  const url = 'attendance/filter';

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, {cityManager})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const getCenterNmae = id => {
  console.log('centerId', id);
  const url = `center/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
