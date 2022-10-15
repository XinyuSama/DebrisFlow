// 导入封装好的Axios
import request from "@/utils/http/request";


//注意request.js的相对路径问题

// const tokens = JSON.parse(localStorage.getItem('sutuofeng_login_info')).token
// console.log(tokens,89898)
//1. get请求---获取首页的多个数据



// 获取页数据
export let getPageData =(startId,pagesDataLength)=>{
  return  request({
    url:'getPageData',
    method:'post',
    data:{
      "startId":startId,
      "pagesDataLength":pagesDataLength
    }
  })
}
// 获取mysql全部数据
export let getAllData =()=>{
  return  request({
    url:'getAllData',
    method:'get',
  })
}
// 获取redis数据
export let getAllDataByRedis =()=>{
  return  request({
    url:'getAllDataByRedis',
    method:'get',
  })
}
// 获取最新的一条数据
export let getLatestOneData =()=>{
  return  request({
    url:'getLatestOneData',
    method:'get',
  })
}
// 根据时间获取数据
export let getDataByTime =(startTime,endTime)=>{
  return  request({
    url:'getDataByTime',
    method:'post',
    data:{
      "startTime":startTime,
      "endTime":endTime
    }
  })
}
