import {Car} from "../types.ts";
import * as React from "react";
import {DialogContent, Stack, TextField} from "@mui/material";

type DialogFormProps = {
    car: Car,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CarDialogContent = ({car, handleChange}: DialogFormProps) => {
    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Brand" name="brand" value={car.brand} onChange={handleChange}/>
                    <TextField label="Model" name="model" value={car.model} onChange={handleChange}/>
                    <TextField label="Color" name="color" value={car.color} onChange={handleChange}/>
                    <TextField label="Registration Number" name="registrationNumber" value={car.registrationNumber}
                               onChange={handleChange}/>
                    <TextField label="Description" name="description" value={car.description}
                               onChange={handleChange}/>
                    <TextField label="Model Year" name="modelYear" value={car.modelYear} onChange={handleChange}/>

                    <TextField label="Price" name="price" value={car.price} onChange={handleChange}/>
                </Stack>
            </DialogContent>
        </>
    )
}

export default CarDialogContent;