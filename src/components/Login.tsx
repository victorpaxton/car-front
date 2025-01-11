import {useState} from "react";
import {Button, Snackbar, Stack, TextField} from "@mui/material";
import * as React from "react";
import axios from "axios";
import CarList from "./CarList.tsx";

type User = {
    username: string,
    password: string
}

const Login = () => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [open, setOpen] = useState(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    function handleLogin() {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => {
                const jwtToken = res.headers.authorization;
                if (jwtToken) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuthenticated(true);
                }
            })
            .catch((error) => {
                setOpen(true)
                console.error(error)
            })
    }

    const handleLogout = () => {
        setAuthenticated(false);
        sessionStorage.setItem("jwt", "");
    }


    return isAuthenticated ? (
            <CarList logout={handleLogout}/>
        ) : (
        <Stack spacing={2} alignItems="center" mt={2}>
            <TextField
                name="username"
                label="username"
                onChange={handleChange}
            />
            <TextField
                name="password"
                label="password"
                type="password"
                onChange={handleChange}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}
            >
                Login
            </Button>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Login failed: Check username and password"
            />
        </Stack>
    )
}

export default Login;