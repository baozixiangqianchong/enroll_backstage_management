
import http from "../utils/http";

// 取消学生的安排
export const cancelTime = (ids, type, arrange_id) => {
    return http({
        url: "/march/admin/arrange/cancelTime",
        method: "DELETE",
        data: {
            ids,
            type,
            arrange_id
        }
    })
}
// 取消整场学生的安排
export const cancelField = (id) => {
    return http({
        url: "/march/admin/arrange/delete",
        method: "DELETE",
        data: {
            id
        }
    })
}
//获取安排组详细信息 
export const arrangeDetail = (id) => {
    return http({
        url: "/march/admin/arrange/detail",
        method: "GET",
        params: {
            id
        }
    })
}


//自动生成面试表
export const addArrange = (data) => {
    return http({
        url: "/march/admin/arrange/addArrangeGroup",
        method: "POST",
        data
    })
}

//获取面试安排
export const getArrange = () => {
    return http({
        url: "/march/admin/arrange/getArrangeGroup",
        method: "GET",
    })
}

//修改个人宣讲时间
export const VisitTime = (data) => {
    return http({
        url: "/march/admin/arrange/updateVisitTime",
        method: "PUT",
        data
    })
}

//修改个人面试时间
export const InterviewTime = (data) => {
    return http({
        url: "/march/admin/arrange/updateInterviewTime",
        method: "PUT",
        data
    })
}

//修改学生状态
export const StatusState = (data) => {
    return http({
        url: "/march/admin/updateStatusState",
        method: "PUT",
        data
    })
}
