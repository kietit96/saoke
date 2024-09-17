import apiClient from "./apiClient"

const url = "/thongke/"
const list = {
    getAll(val) {
        return apiClient.get(url, { params: { title: val } })
    }
}
export default list