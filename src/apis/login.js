import http from "../utils/http";

export const LoginAPI = (data) => {
    return http({
        url: "/march/admin/login",
        method: "POST",
        data
    })
}