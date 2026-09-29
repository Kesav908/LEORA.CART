import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchCart = () => {
        fetch("http://localhost:8080/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch cart");
                }
                return response.json();
            })
            .then((data) => {
                setCart(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load cart");
                setLoading(false);
            });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }

        fetch(`http://localhost:8080/cart/items/${itemId}?quantity=${quantity}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to update quantity");
                return response.json();
            })
            .then((data) => {
                setCart(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to update quantity");
            });
    };

    const removeItem = (itemId) => {
        fetch(`http://localhost:8080/cart/items/${itemId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to remove item");
                fetchCart();
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to remove item");
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading cart...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 mt-4">
                <div className="alert alert-danger bg-danger text-white border-0 glass-panel">
                    {error}
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container py-5 mt-4 text-center glass-panel p-5 mt-5 mx-auto" style={{ maxWidth: "600px" }}>
                <h2 className="text-white fw-bold mb-4">Your Cart is Empty</h2>
                <p className="text-secondary mb-5">Looks like you haven't added anything to your cart yet.</p>
                <button className="btn-neon" onClick={() => navigate("/products")}>BROWSE PRODUCTS</button>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-4">
            <div className="mb-5">
                <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>CHECKOUT</p>
                <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    Your Cart
                </h2>
            </div>

            <div className="row">
                <div className="col-lg-8 mb-4">
                    {cart.items.map((item) => (
                        <div className="glass-panel p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3" key={item.id}>
                            <div className="flex-grow-1" style={{ minWidth: "200px" }}>
                                <h5 className="text-white m-0 fw-bold">{item.productName}</h5>
                            </div>

                            <div style={{ minWidth: "100px" }}>
                                <p className="text-secondary m-0" style={{ fontSize: "0.85rem" }}>Price</p>
                                <p className="text-white m-0">₹{Number(item.unitPrice).toLocaleString("en-IN")}</p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <button
                                    className="btn btn-outline-light border-secondary text-white rounded-circle p-0"
                                    style={{ width: "32px", height: "32px" }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    −
                                </button>
                                <span className="text-white fw-bold mx-2" style={{ width: "20px", textAlign: "center" }}>{item.quantity}</span>
                                <button
                                    className="btn btn-outline-light border-secondary text-white rounded-circle p-0"
                                    style={{ width: "32px", height: "32px" }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <div style={{ minWidth: "100px", textAlign: "right" }}>
                                <p className="text-secondary m-0" style={{ fontSize: "0.85rem" }}>Total</p>
                                <p className="text-neon fw-bold m-0 fs-5">₹{Number(item.lineTotal).toLocaleString("en-IN")}</p>
                            </div>

                            <div>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-lg-4">
                    <div className="glass-panel p-4 position-sticky" style={{ top: "100px" }}>
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Order Summary</h4>
                        
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-secondary">Subtotal</span>
                            <span className="text-white">₹{Number(cart.total).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span className="text-secondary">Shipping</span>
                            <span className="text-white">Free</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-4 pt-3 border-top border-secondary">
                            <span className="text-white fw-bold fs-5">Total</span>
                            <span className="text-neon fw-bold fs-4">₹{Number(cart.total).toLocaleString("en-IN")}</span>
                        </div>

                        <button
                            className="btn-neon w-100"
                            onClick={() => navigate("/checkout")}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;