// 导入封装好的Axios
import {request} from './request' //注意request.js的相对路径问题

// const tokens = JSON.parse(localStorage.getItem('sutuofeng_login_info')).token
// console.log(tokens,89898)
//1. get请求---获取首页的多个数据


//登陆
export function login(account,password) {
  return request({
    url:'/api/login',
     headers: {
      'Content-Type': 'application/json'
    },
    method:'post',
    data: {
      account:account,
      password:password
    }
  })
}


// 获取周数
export function getWeekTime(tokens) {
  return request({
    url:'/api/Message_wall/getWeekTime',
    method:'get',
    headers: {
      "Authorization":"Bearer "+tokens
    },
  })
}
// 获取墙诗句
export function getWallMessage(tokens) {
  return request({
    url:'/api/Message_wall/getMessage',
    method:'get',
    headers: {
      "Authorization":"Bearer "+tokens
    },
    // 可以带参数也可以不带参数
    // params: {
    //     userName: 'Lan',
    //     password: '123'
    // }
  })
}
// 添加诗句
export function addWallMessage(Verses,names,tokens) {
  return request({
    url:'/api/Message_wall/addMessage',
    method:'get',
    params: {
      Verse:Verses ,
      name:names
    },
    headers: {
      "Authorization":"Bearer "+tokens
    },
  })
}
//按周次获取班级分数
export function GetClassScoreMassageByWeek(week,tokens) {
  return request({
    url:'/api/Class_score/GetClassScoreMassageByWeek',
     headers: {
       "Authorization":"Bearer "+tokens
    },
    method:'post',
    data: {
        week:week
     }
  })
}
//提交申请
export function SentScoreMessage(ruleForm,tokens,storage) {
  return request({
    url:'/api/Class_score/addScore',
    headers: {
      "Authorization":"Bearer "+tokens
    },
    method:'post',
    data: {
      sent_name:storage.name,
      sent_user_id:storage.id,
      score:ruleForm.score,
      reason:ruleForm.because
    }
  })
}
//查看申请进度
export function GetSubmitById(id,tokens) {
  return request({
    url:'/api/Class_score/GetSubmitById',
    headers: {
      "Authorization":"Bearer "+tokens
    },
    method:'post',
    data: {
      id:id
    }
  })
}

//管理员获取学生提交的申请
export function GetSentMessage(tokens,storage) {
  return request({
    url:'/api/Class_score/GetSentMessage',
    headers: {
      "Authorization":"Bearer "+tokens
    },
    method:'post',
    data: {
      id:storage.id,
    }
  })
}
//管理员确认学生提交的申请
export function PassSubmit(stateid,score_info_id,tokens,storage,sent_user_id,score) {
  return request({
    url:'/api/Class_score/PassSubmit',
    headers: {
      "Authorization":"Bearer "+tokens
    },
    method:'post',
    data: {
      state_id:stateid,
      score_info_id:score_info_id,
      cheak_user_id:storage.id,
      sent_user_id:sent_user_id,
      score:score

    }
  })
}
// // 2.1 post请求---传输json数据时，获取电视剧多个数据
// export function getOwnDataList() {
//   return request({
//     url:'/Post/getOwnDataList',
//      headers: {
//       'Content-Type': 'application/json'
//     },
//     method:'post',
//     data: {
//         userId:'2020032623'
//      }
//   })
// }

// //2.2 post请求---传输文件流,表单Form Data 数据时
// export function getMovieMultidata() {
//   return request({
//     url:'/api/Movie',
//     headers: {
//     'Content-Type': 'multipart/form-data'
//     },
//     method:'post',
//     data: {
//         userName: 'Lan',
//         password: '123'
//      }
//   })
// }
