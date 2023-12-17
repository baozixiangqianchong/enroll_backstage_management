import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAllSignUpAPI, getScreenAPI } from "@/apis/apply.js";

export const setStore = defineStore('setInter',
    () => {
        //1.定义管理用户数据的state
        const setInfo = ref({})
        // 判断数据是否选中
        const setflag = ref({})
        //清空选中数据
        const sendInfo = ref([])
        //2.定义获取接口数据的action函数
        const setData = async () => {
            const res = await getAllSignUpAPI();
            // 改变数据里的时间
            Martha(res.data)
        }
        //2.定义获取接口数据的action函数
        const getScreen = async (gender, state, name) => {
            if (state == "") {
                state = 1
            } else {
                state = parseInt(state)
            }
            const res = await getScreenAPI(gender, state, name);
            // 改变数据里的时间
            Martha(res.data)
        }

        // 改变时间的方法，封装调用
        const Martha = (data) => {
            //用forEach循环遍历改变时间
            data.forEach((item) => {
                const date = new Date(item.CreatedAt);
                // 使用toLocaleString方法并传递适当的选项
                item.CreatedAt = date.toLocaleString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                });
            })
            //更改时间后赋值给setInfo
            setInfo.value = data;
        }

        //筛选过滤，flag=true的对象
        const spillFlag = () => {
            setflag.value = setInfo.value.filter(item => item.flag === true)
        }

        //单选
        const singCheck = (ID, selected) => {
            const item = setInfo.value.find((item) => item.ID === ID)
            item.flag = selected
            spillFlag()
        }
        //多选
        const isAll = computed(() => {
            // return setInfo.value.every((item) => item.flag)
            const values = Object.values(setInfo.value);
            // Object.values() 来获取对象中的值
            return values.every((item) => item.flag)
        })
        //全选功能
        const allCheck = (flag) => {
            setInfo.value.forEach(item => item.flag = flag)
            spillFlag()
        }
        return {
            getScreen,
            setflag,
            spillFlag,
            isAll,
            allCheck,
            setInfo,
            setData,
            singCheck,
            sendInfo
        }
    },
    {
        persist: true
    }
)

