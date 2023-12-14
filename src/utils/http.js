import axios from "axios";	//导入 Axios 库，用于发送 HTTP 请求。
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { userLogin } from '@/stores/user.js';
import router from "@/router/index"
// 创建新的axios实例
const http = axios.create({
    // 环境变量，需要在.env文件中配置
    baseURL: "http://39.101.77.206:8181",
    // baseURL: "yangchengxi.e3.luyouxia.net:11992",
    // 超时时间暂定5s
    timeout: 5000,
});

http.interceptors.request.use(
    config => {
        //从pinia获取token数据
        const user = userLogin()
        //按照后端的要求拼接token数据
        const token = user.userInfo.token
        //token作用,用来判断一些接口是否返回(例:登录和未登录)
        if (token) {
            //将token添加到接口
            config.headers.Authorization = `Bearer ${token}`
            // config.headers.Authorization = "Bearer " + token || ""
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// axios响应式拦截器
http.interceptors.response.use(res => {

    if (res.data.code === 1006) {
        //统一错误提示
        ElMessage({
            type: 'warning',
            message: "登录失效，请重新登录！"
        })
        //跳转到登录页面
        router.push("/");
    }
    return res.data
}, e => {
    console.log(e, "res");
    // if (e.data.code === 1006) {
    //     //统一错误提示
    //     ElMessage({
    //         type: 'warning',
    //         message: "登录失效，请重新登录！"
    //     })
    //     //跳转到登录页面
    //     router.push("/");
    // }
    console.log("响应拦截器", e);
    return Promise.reject(e)
})

export default http; //导出封装后的 Axios 对象，以便在其他地方引用和使用。