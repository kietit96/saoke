import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import list from "../../api/ListApi";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import "./style.scss"
const columns = [{ field: "id", headerName: "ID", width: "8%", color: "#FFF" },
{
    field: "date_time",
    headerName: "Ngày giao dịch",
    width: "15%"
},
{ field: "credit", headerName: "Số tiền giao dịch", width: "18%" },
{ field: "detail", headerName: "Nội dung giao dịch", width: "35%" },
{ field: "note", headerName: "Ghi chú", width: "24%" }]
ListSaoKe.propTypes = {
    value2: PropTypes.string,
    note_id: PropTypes.string,
    note_content: PropTypes.string,
    btnEditNote: PropTypes.func,
}
export default function ListSaoKe({ value2, btnEditNote, note_id, note_content }) {
    const [listThongke, setListThongke] = useState([])
    useEffect(() => {
        if (value2 === "") {
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
        <TableContainer sx={{ minHeight: "70vh", maxHeight: "70vh" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, indx) => (<TableCell sx={{ width: { lg: col.width } }} key={indx}>{col.headerName}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listThongke?.map((val, indx) => (
                        <TableRow key={indx}>
                            <TableCell>{val.id}</TableCell>
                            <TableCell>{getDate(val.date_time)}</TableCell>
                            <TableCell>{`${formatMoney(val.credit)} VNĐ`}</TableCell>
                            <TableCell>{val.detail}</TableCell>
                            <TableCell><Button sx={{ minWidth: "auto", padding: "5px" }} onClick={() => btnEditNote(val.id, val.note)} variant="contained"><EditRoundedIcon /></Button> {val.id * 1 === note_id * 1 && note_id !== "" ? note_content : val.note}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}