import apiClient from "./apiClient"

const url = "/thongke/"
const list = {
    getAll(params) {
        console.log(apiClient.get(url, { params }))
        return apiClient.get(url, { params })
    }
}
export default list