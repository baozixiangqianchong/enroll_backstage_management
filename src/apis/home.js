import http from "../utils/http";


//首页筛选（获取展示表格的信息）
export const BySpeciaIty = () => {
    return http({
        url: "/march/admin/groupBySpecialty",
        method: "GET"
    })
}


//获取七天报名
export const getSeven = () => {
    return http({
        url: "/march/admin/getStudentInSeven",
        method: "GET",
    })
}
// 获取面试记录
export const InterviewRecord = (arrange_id) => {
    return http({
        url: "/march/admin/interviewRecord/query",
        method: "GET",
        params: {
            arrange_id
        }
    })
}

// 获取树状选择
export const Menus = (type) => {
    return http({
        url: "/march/admin/arrange/menus",
        method: "GET",
        params: { type }
    })
}
