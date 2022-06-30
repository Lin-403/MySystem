import NProgress from 'nprogress'
import axios from 'axios'
import {store} from '../redux/store';


axios.defaults.baseURL = "http://localhost:8000"

// axios.interceptors.request.use(
//   config => {
//     NProgress.start() // 设置加载进度条(开始..)
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
// // axios响应拦截器
// axios.interceptors.response.use(
//   function (response) {
//     NProgress.done() // 设置加载进度条(结束..)
//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.done() // 设置加载进度条(结束..)
  store.dispatch({
    type:'change-loading',
    payload:true
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  NProgress.done() // 设置加载进度条(结束..)
  store.dispatch({
    type:'change-loading',
    payload:false
  })
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch({
    type:'change-loading',
    payload:false
  })
  return Promise.reject(error);
});