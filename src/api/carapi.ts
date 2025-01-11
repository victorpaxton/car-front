import {Car, CarEntry, CarResponse} from "../types.ts";
import axios, {AxiosRequestConfig} from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");

    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }
}

const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`,
        getAxiosConfig());
    return response.data._embedded.cars;
}

const deleteCar = async (link: string): Promise<CarResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
}

const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, getAxiosConfig())
    return response.data;
}

const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
    const response = await axios.put(carEntry.url, carEntry.car, getAxiosConfig())
    return response.data;
}

export {getCars, deleteCar, addCar, updateCar};