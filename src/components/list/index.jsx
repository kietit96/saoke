import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import list from "../../api/ListApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const columns = [{ field: "id", headerName: "ID", width: "10%", color: "#FFF" },
{
    field: "date_time",
    headerName: "Ngày giao dịch",
    width: "15%"
},
{ field: "credit", headerName: "Số tiền giao dịch", width: "20%" },
{ field: "detail", headerName: "Nội dung giao dịch", width: "55%" }]
ListSaoKe.propTypes = {
    value2: PropTypes.string
}
export default function ListSaoKe({ value2 }) {
    const [listThongke, setListThongke] = useState([])
    useEffect(() => {
        if (value2 === 0) {
            setListThongke([])
            return
        }
        const getListSaoKe = async () => {
            try {
                const newList = await list.getAll(value2)
                if (!newList) {
                    setListThongke([])
                    return
                }
                setListThongke(newList)
            } catch (error) {
                console.log(error)
            }
        }
        if (value2) {
            getListSaoKe()
        }
    }, [value2])
    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign +
                (j ? i.substring(0, j) + thousands : '') +
                i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    }
    function getDate(date_time) {
        if (date_time === "") {
            return
        }
        return date_time.substring(0, date_time.indexOf("_"))
    }
    return (
        <TableContainer sx={{ maxHeight: "75vh" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, indx) => (<TableCell sx={{ color: "#FFF", fontWeight: "800", width: col.width }} key={indx}>{col.headerName}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listThongke?.map((val, indx) => (
                        <TableRow key={indx}>
                            <TableCell sx={{ color: "#FFF" }}>{val.id}</TableCell>
                            <TableCell sx={{ color: "#FFF" }}>{getDate(val.date_time)}</TableCell>
                            <TableCell sx={{ color: "#FFF" }}>{`${formatMoney(val.credit)} VNĐ`}</TableCell>
                            <TableCell sx={{ color: "#FFF" }}>{val.detail}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}