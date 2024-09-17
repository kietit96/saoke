import { useEffect, useState } from "react";
import list from "../../api/ListApi";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const styleTable = {
    height: "70vh",
    width: "100%",
    background: "rgba(0,0,0,0.4)",
}
const columns = [{ field: "id", headerName: "ID", flex: 0.2, color: "#FFF" },
{
    field: "date_time",
    headerName: "Ngày giao dịch",
    flex: 0.2
},
{ field: "credit", headerName: "Số tiền giao dịch", flex: 0.2 },
{ field: "detail", headerName: "Nội dung giao dịch", flex: 0.5 }]
export default function ListSaoKe({ value2 }) {
    const [listThongke, setListThongke] = useState([])
    useEffect(() => {
        const getListSaoKe = async () => {
            try {
                const newList = await list.getAll(value2)
                setListThongke(newList)
            } catch (error) {
                console.log(error)
            }
        }
        if (value2) {
            getListSaoKe()
        }
    }, [value2])
    return (
        <Paper sx={styleTable}>
            <DataGrid
                rows={listThongke}
                columns={columns}
                sx={{
                    border: 0,
                    '& .MuiDataGrid-container--top [role=row]':{
                        background: "transparent"
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'white', // Set text color of table data (td)
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'white', // Set text color of column headers
                    },
                    '& .MuiDataGrid-footerContainer': {
                        color: 'white', // Text color of pagination and footer
                        '& .MuiTablePagination-root': {
                            color: 'white', // Pagination text color
                        },
                        '& .MuiButtonBase-root': {
                            color: 'white', // Color for pagination buttons (next/previous)
                        },
                    },
                }}
            >
            </DataGrid>
        </Paper>
    )
}