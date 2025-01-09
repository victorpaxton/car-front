import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteCar, getCars} from "../api/carapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {useState} from "react";
import {IconButton, Snackbar} from "@mui/material";
import AddCar from "./AddCar.tsx";
import EditCar from "./EditCar.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

const CarList = () => {

    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 150},
        {field: 'model', headerName: 'Model', width: 150},
        {field: 'color', headerName: 'Color', width: 150},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
        {field: 'description', headerName: 'Description', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 100},
        {field: 'price', headerName: 'Price', width: 100},
        {
            field: 'edit',
            headerName: '',
            width: 70,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => <EditCar carData={params.row}/>
        },
        {
            field: 'delete',
            headerName: '',
            width: 70,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                            mutate(params.row._links.self.href)
                        }
                    }}
                >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            ),
        },
    ];

    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    })

    const {mutate} = useMutation(deleteCar, {
        onSuccess: () => {
            // Car deleted
            queryClient.invalidateQueries({queryKey: ["cars"]});
            setOpen(true);
        },
        onError: (error) => {
            // Error when deleting car
            console.error(error)
        }
    })

    return !isSuccess ? (
        <span>Loading...</span>
    ) : error ? (
        <span>Error when fetching cars...</span>
    ) : (
        <>
            <AddCar/>
            <DataGrid
                columns={columns}
                rows={data}
                getRowId={(row) => row._links.self.href}
                disableRowSelectionOnClick={true}
                slots={{toolbar: GridToolbar}}
            />
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </>
    )
}

export default CarList;