import http from "../utils/http";

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
