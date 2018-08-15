import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    let token= localStorage.getItem('myToken')
    if(token){
        config.headers.Authorization = token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
export const LoginPost = function (params) {
  return axios.post('/login',params).then(function(res){
    return res.data
  })
}