import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import Layout from "./Layout";
import { StoreProvider } from "./store/StoreContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ThemeProvider } from "./theme/ThemeContext";

const queryClient = new QueryClient();
function App() {
    return (
        <ThemeProvider>
        <StoreProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="" Component={Layout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/product/:id" Component={ProductDetailsPage} />
                        <Route path="/cart" Component={CartPage} />
                        <Route path="/add-product" Component={AddProductPage} />
                        <Route path="*" Component={NotFoundPage} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
        </StoreProvider>
        </ThemeProvider>
    )

}

export default App
