import './App.css'
import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import CarList from "./components/CarList.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

    return (
        <Container maxWidth="xl">
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Car shop</Typography>
                </Toolbar>
            </AppBar>

            <QueryClientProvider client={queryClient}>
                <CarList/>
            </QueryClientProvider>
        </Container>
    )
}

export default App
