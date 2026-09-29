import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost:8080/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch order");
                return response.json();
            })
            .then((data) => {
                setOrder(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load order");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, token]);

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading order...</h4>
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

    if (!order) {
        return (
            <div className="container py-5 mt-4 text-center">
                <h2 className="text-white">Order not found</h2>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-4">
            
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>ORDER CONFIRMATION</p>
                    <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                        Thank you!
                    </h2>
                </div>
                <Link to="/orders" className="text-neon text-decoration-none fw-bold" style={{ fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--neon-accent)", paddingBottom: "2px" }}>
                    ← BACK TO ORDERS
                </Link>
            </div>

            <div className="glass-panel p-4 mb-5 border-neon bg-dark" style={{ borderStyle: "solid", borderWidth: "2px" }}>
                <h4 className="text-white fw-bold mb-2">Order Placed Successfully</h4>
                <p className="text-secondary m-0" style={{ fontSize: "1rem" }}>
                    Your order ID is <strong className="text-neon">#{order.id}</strong>
                </p>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="glass-panel p-4 p-md-5 mb-4">
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Items</h4>
                        
                        {order.orderItems?.map((item) => (
                            <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary flex-wrap gap-3" key={item.id}>
                                <div className="flex-grow-1" style={{ minWidth: "200px" }}>
                                    <strong className="text-white fs-5">{item.productName}</strong>
                                </div>
                                <div className="text-secondary" style={{ minWidth: "80px" }}>
                                    Qty: <span className="text-white fw-bold">{item.quantity}</span>
                                </div>
                                <div className="text-secondary" style={{ minWidth: "100px" }}>
                                    ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                                </div>
                                <div className="text-neon fw-bold fs-5" style={{ minWidth: "120px", textAlign: "right" }}>
                                    ₹{Number(item.lineTotal).toLocaleString("en-IN")}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel p-4 p-md-5">
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Order Details</h4>
                        
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>ORDER ID</strong>
                                <p className="text-white fs-5 m-0">#{order.id}</p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>STATUS</strong>
                                <span className="badge bg-transparent border border-secondary text-white px-3 py-2 rounded-pill mt-1" style={{ letterSpacing: "0.05em" }}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="col-md-6 mb-4">
                                <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>CREATED ON</strong>
                                <p className="text-secondary m-0">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="glass-panel p-4 position-sticky" style={{ top: "100px" }}>
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Price Summary</h4>
                        
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-secondary">Subtotal</span>
                            <span className="text-white">₹{Number(order.subTotal).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-secondary">Tax</span>
                            <span className="text-white">₹{Number(order.tax).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span className="text-secondary">Shipping</span>
                            <span className="text-white">₹{Number(order.shippingFee).toLocaleString("en-IN")}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-2 pt-3 border-top border-secondary">
                            <span className="text-white fw-bold fs-5">Total</span>
                            <span className="text-neon fw-bold fs-3">₹{Number(order.total).toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderDetails;