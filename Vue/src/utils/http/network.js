// 导入封装好的Axios
import {request} from './request' //注意request.js的相对路径问题

// const tokens = JSON.parse(localStorage.getItem('sutuofeng_login_info')).token
// console.log(tokens,89898)
//1. get请求---获取首页的多个数据



// 获取周数
export function getdata(url) {
  return request({
    url:url,
    method:'get',
  })
}
