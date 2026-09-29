
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profiles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import Location from "./pages/Location";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Order";

function App() {

    return (
        <BrowserRouter>

            <NavBar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/checkout"
                    element={
                     <ProtectedRoute>
                         <Checkout />
                    </ProtectedRoute>
                    }
                />
                <Route
    path="/address"
    element={
        <ProtectedRoute>
            <Address />
        </ProtectedRoute>
    }
/>
<Route
    path="/location"
    element={
        <ProtectedRoute>
            <Location />
        </ProtectedRoute>
    }
/>
<Route
    path="/orders/:id"
    element={
        <ProtectedRoute>
            <OrderDetails />
        </ProtectedRoute>
    }
/>
                <Route path="/orders" element={<Orders />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;

