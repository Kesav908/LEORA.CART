import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
    const { token } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Please login to view your orders.");
            setLoading(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.userId;

            if (!userId) {
                throw new Error("User ID not found in token");
            }

            fetch(`http://localhost:8080/orders/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to fetch orders");
                    return response.json();
                })
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.error(error);
                    setError("Unable to load orders.");
                })
                .finally(() => {
                    setLoading(false);
                });

        } catch (error) {
            console.error(error);
            setError("Invalid authentication token.");
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading orders...</h4>
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

    return (
        <div className="container py-5 mt-4 mb-5">
            <div className="mb-5">
                <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>HISTORY</p>
                <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    My Orders
                </h2>
            </div>

            {orders.length === 0 ? (
                <div className="glass-panel p-5 text-center mt-4 mx-auto" style={{ maxWidth: "600px" }}>
                    <h5 className="text-white fw-bold mb-3">No Orders Found</h5>
                    <p className="text-secondary mb-4">You haven't placed any orders yet.</p>
                    <Link to="/products" className="btn-neon">START SHOPPING</Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        {orders.map((order) => (
                            <div className="glass-panel glow-card p-4 mb-4" key={order.id}>
                                <div className="row align-items-center g-3">
                                    <div className="col-md-3">
                                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>ORDER ID</strong>
                                        <p className="text-white fs-5 m-0">#{order.id}</p>
                                    </div>

                                    <div className="col-md-3">
                                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>STATUS</strong>
                                        <p className="m-0">
                                            <span className="badge bg-transparent border border-secondary text-white px-3 py-2 rounded-pill" style={{ letterSpacing: "0.05em" }}>
                                                {order.status}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="col-md-3">
                                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>TOTAL</strong>
                                        <p className="text-white fw-bold fs-5 m-0">₹{Number(order.total).toLocaleString("en-IN")}</p>
                                    </div>

                                    <div className="col-md-3 text-md-end">
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="btn-neon"
                                            style={{ padding: "10px 24px", fontSize: "0.8rem" }}
                                        >
                                            VIEW DETAILS
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;