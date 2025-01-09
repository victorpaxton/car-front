import * as React from "react";
import {useState} from "react";
import {Car} from "../types.ts";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCar} from "../api/carapi.ts";
import CarDialogContent from "./CarDialogContent.tsx";


const AddCar = () => {

    const [open, setOpen] = useState(false);

    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        description: '',
        modelYear: 0,
        price: 0,
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cars'])
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const handleSave = () => {
        mutate(car);
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            description: '',
            modelYear: 0,
            price: 0,
        });
        handleClose();
    }

    return (
        <>
            <Button onClick={handleOpen}>Add new car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar;