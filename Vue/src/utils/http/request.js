import axios from 'axios'
import {error} from '../message'
// import loading from "@/utils/http/loading";
import { Loading } from 'element-ui';


// import pageLoading from '../../assets/css/pageLoading.css'







 function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // 设置基础的url配置项，这样接口处的url前面就不用写url:'http://127.0.0.1:8000/api/home'，直接写成 url:'/api/home', 就可以了
    // baseURL: 'https://interface.sina.cn',
    baseURL: 'http://localhost:3000/api',
    //设置请求超时时间
    timeout: 30000
  })

  // 2.axios的拦截器，用不到的可以忽略这节
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
      if (config.url!='getLatestOneData'){
          showFullScreenLoading()
      }

    return config
  }, err => {
    console.log('请求拦截err: '+err);
  })

  // // 2.2.响应拦截 过滤掉一些状态码
  instance.interceptors.response.use(res => {
    //关闭loading加载
    tryHideFullScreenLoading()
    return res.data
  }, err => {
        console.log('响应拦截err: '+err);
        error("请求失败")

  })

  // 3.发送真正的网络请求
  return instance(config)
}


import pageLoading from '../../assets/css/pageLoading.css'

let loading = null //定义loading变量

//开始 加载loading
let startLoading=()=>{
  loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//结束 取消loading加载
let endLoading=()=>{
  loading.close()
}

//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading

let needLoadingRequestCount = 0 //声明一个变量

let showFullScreenLoading=()=> {
  if (needLoadingRequestCount === 0) { //当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ //全局变量值++
}

let tryHideFullScreenLoading=()=> {
  if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {  //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}


export default request;
