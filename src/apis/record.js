import http from "../utils/http";

// 新增列
export const AddedTrain = (id) => {
    return http({
        url: "/march/admin/arrange/col",
        method: "POST",
        params: {
            id
        }
    })
}
// 删除列
export const DeleteTrain = (arrange_id, content_id) => {
    return http({
        url: "/march/admin/arrange/col",
        method: "DELETE",
        params: {
            arrange_id,
            content_id
        }
    })
}