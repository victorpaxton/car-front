import * as React from "react";
import {useState} from "react";
import {Car, CarResponse} from "../types.ts";
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip} from "@mui/material";
import CarDialogContent from "./CarDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCar} from "../api/carapi.ts";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    carData: CarResponse
}

const EditCar = ({carData}: FormProps) => {

    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        description: '',
        modelYear: 0,
        price: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setCar({
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            registrationNumber: carData.registrationNumber,
            description: carData.description,
            modelYear: carData.modelYear,
            price: carData.price,
        });

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        mutate({
            car: car,
            url: carData._links.self.href
        })
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            description: '',
            modelYear: 0,
            price: 0,
        });
        setOpen(false);
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars'])
        },
        onError: (err) => {
            console.error(err)
        }
    })

    return (
        <>
            <Tooltip title="Edit car">
                <IconButton onClick={handleOpen} size="small">
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;