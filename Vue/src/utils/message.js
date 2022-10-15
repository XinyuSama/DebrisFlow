/**
 * description:
 * date: 2022/10/11/16:31:00
 * author: xinyu
 * version: 1.0
 **/
import {MessageBox, Message} from 'element-ui'

export const message = (msg, type) => {
    Message({
        showClose: true,
        message: msg,
        type: type
    });
}
//成功
export const success = (msg) => {
    message(msg, 'success');
}
//消息
export const info = (msg) => {
    message(msg, 'info');
}
//错误
export  const error = (msg) => {
    message(msg, 'error');
}
//警告
export const warning = (msg) => {
    message(msg, 'warning');
}

//ElMessageBox
export const alert = ({title, msg, okBtnText, func}) => {
    if (!title) {
        title = '提示';
    }
    if (!msg) {
        msg = '错误';
    }
    if (!okBtnText) {
        okBtnText = '确定';
    }
    MessageBox.alert(msg, title, {
        confirmButtonText: okBtnText,
    }).then(func ? func : () => {})
}

export const confirm = ({title, msg, func, cFunc}) => {
    MessageBox.confirm(msg, title ? title:'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(func ? func : () => {}).catch(cFunc ? cFunc : () => {});
}
