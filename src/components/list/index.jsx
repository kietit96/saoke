import { useEffect } from "react";
import list from "../../api/ListApi";

export default function ListSaoKe() {
    useEffect(() => {
        const getListSaoKe = async () => {
            const newList = await list.getAll("xin")
            console.log(newList)
            return newList
        }
        getListSaoKe()
    })
    return (
        <div></div>
    )
}