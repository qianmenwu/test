import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

export const LoginPost = function (params) {
  return axios.post('/login',params).then(function(res){
    return res.data
  })
}