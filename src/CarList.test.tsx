import {afterAll, beforeAll, describe, expect, test} from "vitest";
import CarList from "./components/CarList.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {userEvent} from "@testing-library/user-event";

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

beforeAll(() => {
    mock.onGet(`${import.meta.env.VITE_API_URL}/api/cars`).reply(200, {
        "_embedded": {
            "cars": [
                {
                    "brand": "Toyota",
                    "model": "Prius",
                    "color": "Silver",
                    "registrationNumber": "KKO-0212",
                    "description": "Hybrid",
                    "modelYear": 2018,
                    "price": 39000,
                    "_links": {
                        "self": {
                            "href": "http://localhost:8080/api/cars/154"
                        },
                        "car": {
                            "href": "http://localhost:8080/api/cars/154"
                        },
                        "owner": {
                            "href": "http://localhost:8080/api/cars/154/owner"
                        }
                    }
                },
                {
                    "brand": "Ford",
                    "model": "Mustang",
                    "color": "Red",
                    "registrationNumber": "ADF-1121",
                    "description": "Convertible",
                    "modelYear": 2017,
                    "price": 59000,
                    "_links": {
                        "self": {
                            "href": "http://localhost:8080/api/cars/202"
                        },
                        "car": {
                            "href": "http://localhost:8080/api/cars/202"
                        },
                        "owner": {
                            "href": "http://localhost:8080/api/cars/202/owner"
                        }
                    }
                }
            ]
        }
    });
});

afterAll(() => {
    mock.restore();
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const wrapper = ({children} : {children: ReactNode}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe("Carlist tests", () => {
    test("component renders", () => {
        render(<CarList/>, {wrapper});
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })

    test("Car are fetched", async () => {
        render(<CarList/>, {wrapper})
        
        await waitFor(() => screen.getByText(/Add New Car/i))
        expect(screen.getByText(/Brand/i)).toBeInTheDocument();
    })

    // Fire Events
    // npm install -D @testing-library/user-event
    test("Open new car modal", async () => {
        render(<CarList/>, {wrapper})

        await waitFor(() => screen.getByText(/Add New Car/i))
        await userEvent.click(screen.getByText(/Add New Car/i))
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    })
})
