import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./Layout";
import { StoreProvider } from "./store/StoreContext";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
    return (
        <ThemeProvider>
            <StoreProvider>
                <BrowserRouter>
                    <Routes>
                        <Route Component={Layout}>
                            <Route path="/" Component={HomePage} />
                            <Route path="/product/:id" Component={ProductDetailsPage} />
                            <Route path="/cart" Component={CartPage} />
                            <Route path="/add-product" Component={AddProductPage} />
                            <Route path="*" Component={NotFoundPage} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </StoreProvider>
        </ThemeProvider>
    );
}

export default App;
