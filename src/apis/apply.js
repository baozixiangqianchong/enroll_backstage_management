import http from "../utils/http";

//获取全部人员信息
export const getAllSignUpAPI = () => {
    return http({
        url: "/march/admin/getAllSignUp",
        method: "GET",
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