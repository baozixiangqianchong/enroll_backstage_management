import http from "../utils/http";

//获取全部人员信息
export const getAllSignUpAPI = () => {
    return http({
        url: "/march/admin/getAllSignUp",
        method: "GET",
    })
}

//首页筛选（获取展示表格的信息）
export const BySpeciaIty = () => {
    return http({
        url: "/march/admin/groupBySpecialty",
        method: "GET"
    })
}

//获取个人详情信息
export const getDetailInfo = (id) => {
    return http({
        url: "/march/admin/getDetailInfo",
        method: "GET",
        params: {
            id
        }
    })
}


//对报名人员筛选
export const getScreenAPI = (gender, state, name) => {
    return http({
        url: "/march/admin/screen",
        method: "GET",
        params: {
            gender, state, name
        }
    })
}

//发送信息
export const SendAPI = (data) => {
    return http({
        url: "/march/admin/sendMsg",
        method: "POST",
        data
    })
}

//获取发送的所有信息
export const getAllMsg = () => {
    return http({
        url: "/march/admin/getAllMsg",
        method: "GET"
    })
}

//通过信息id获取信息详情
export const getDetailsMsg = (id) => {
    return http({
        url: "/march/admin/getDetailsMsg",
        method: "GET",
        params: {
            id
        }
    })
}

//保存到草稿箱
export const addDraft = (content, title) => {
    return http({
        url: "/march/admin/addDraft",
        method: "POST",
        data: {
            title,
            content
        }
    })
}

//获取草稿箱内的所有信息
export const getAllDraft = () => {
    return http({
        url: "/march/admin/getAllDraft",
        method: "GET"
    })
}

//修改草稿箱内的信息
export const updateDraft = (id, title, content) => {
    return http({
        url: "/march/admin/updateDraft",
        method: "PUT",
        data: {
            id, title, content
        }
    })
}

//删除草稿箱
export const deleteDraft = (data) => {
    return http({
        url: "/march/admin/deleteDraft",
        method: "DELETE",
        data
    })
}

//自动生成面试表
export const addArrange = (data) => {
    return http({
        url: "/march/admin/addArrangeGroup",
        method: "POST",
        data
    })
}

//获取面试记录
export const getArrange = () => {
    return http({
        url: "/march/admin/getArrangeGroup",
        method: "GET",
    })
}

//修改个人宣讲时间
export const VisitTime = (data) => {
    return http({
        url: "/march/admin/updateVisitTime",
        method: "PUT",
        data
    })
}

//修改个人面试时间
export const InterviewTime = (data) => {
    return http({
        url: "/march/admin/updateInterviewTime",
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

//同步已参加宣讲的学生状态
export const VisitState = () => {
    return http({
        url: "/march/admin/updateVisitState",
        method: "PUT"
    })
}

//同步已面试的学生状态
export const InterviewState = () => {
    return http({
        url: "/march/admin/updateInterviewState",
        method: "PUT"
    })
}