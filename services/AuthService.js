import {axiosInstance} from './axios';

const url = '/user/login';
export const login = data => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then(response => {resolve(response)
      console.log('dsd',response)
      })
      .catch(err => reject(err));
  });
};

export const createUser = (data) => {
    const url = "/user/sign-up";
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };



export const getCities =()=>{
    const url ="/city";
    return new Promise ((resolve ,reject)=>{
        axiosInstance
        .get(url)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    })
}

export const getCenters = () => {
    const url = "/center";
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };


  export const getUserRoles = () => {
    const url = "/role/role";
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };

  export const getCentersByCity =(id)=>{
    const url = `/center?city=${id}`;
    return new Promise((resolve ,reject)=>{
      axiosInstance
      .get(url).then((response)=> resolve(response)).catch((err)=>reject(err))
    })
  }



