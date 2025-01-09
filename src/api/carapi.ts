import {Car, CarEntry, CarResponse} from "../types.ts";
import axios from "axios";


const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
    return response.data._embedded.cars;
}

const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link);
    return response.data;
}

const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, {
        headers: {'Content-Type': 'application/json'}
    })
    return response.data;
}

const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
    const response = await axios.put(carEntry.url, carEntry.car, {
        headers: {'Content-Type': 'application/json'}
    })

    return response.data;
}

export {getCars, deleteCar, addCar, updateCar};