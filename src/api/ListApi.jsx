import apiClient from "./apiClient"

const url = "/thongke/"
const list = {
    getAll(val) {
        return apiClient.get(url, { params: { title: val } })
    },
    setNote(id, val){
        return apiClient.get(`${url}setNote`,{params: {id, note:val}})
    }
}
export default list