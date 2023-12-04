import { ref } from 'vue'
import { defineStore } from 'pinia'

//保存草稿箱的数据传递到编辑页面
export const InformWay = defineStore('informlist',
    () => {
        //1.定义管理用户数据的state
        const sketch = ref({})
        //2.定义获取接口数据的action函数
        const Anew = (data) => {
            sketch.value = data
        }
        return {
            sketch,
            Anew,
        }
    },
    {
        persist: true
    }
)

