import {axiosInstance} from './axios';

export const getAttendance = ({ city, center }) => {
    let url = "/attendance";
    if (city) url = url + "?city=" + city;
    if (center) url = url + "&center=" + center;
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };


  export const createAttendance = (data) => {
    const url = "/attendance";
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };

  export const getUserRolesByCityCenter = (centerId, cityId) => {
    const url = "/user/getRole";
  
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, { centerId, cityId })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };


  export const getUserFilterationData = (city, center, selectCityManager, selectCenterManager) => {
    const url = "/filter-attendance";
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url,{city, center, selectCityManager, selectCenterManager})
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };


