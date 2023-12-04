import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { LoginAPI } from "@/apis/login.js";
import { useRouter } from "vue-router";
import { setStore } from "@/stores/set.js"


//登录页面正在使用
export const userLogin = defineStore('user',
    () => {

        const router = useRouter();
        //1.定义管理用户数据的state
        const userInfo = ref({})

        //接收调用的方法
        const setAPI = setStore()

        //2.定义获取接口数据的action函数

        const getUserInfo = async (data) => {
            const res = await LoginAPI(data)
            if (res.code === 1000) {
                router.push("/recruit");
                userInfo.value = res.data
                setAPI.setData()
            } else if (res.code === 1004) {
                //统一错误提示
                ElMessage({
                    type: 'error',
                    message: "账号或密码错误！"
                })
            }
            console.log("login", res);


        }
        return {
            userInfo,
            getUserInfo,
        }
    },
    {
        persist: true
    }
)

