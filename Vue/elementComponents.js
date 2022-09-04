/**
 * description:
 * date: 2022/08/10/19:04:00
 * author: xinyu
 * version: 1.0
 **/
import Vue from "vue";
// 在下面的大括号中按需导入所需 Element-UI 中的组件即可
import { Button, Form, FormItem, Input, Row,Col,Slider,Message } from "element-ui";

// 注意：导入的组件都需要使用 Vue.use() 进行注册
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Slider);
// 还可以在此文件中将 Element-UI 中的组件注册为 Vue 的全局方法，如下
// 为 Vue 挂载一个全局的弹窗提示方法，在组件中使用 this.$message 即可调用
Vue.prototype.$message = Message

