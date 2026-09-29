import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [shippingAddressId, setShippingAddressId] = useState("");
    const [billingAddressId, setBillingAddressId] = useState("");
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8080/addresses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch addresses");
                }
                return response.json();
            })
            .then((data) => {
                setAddresses(data);
                const defaultAddress = data.find((address) => address.default);
                if (defaultAddress) {
                    setShippingAddressId(defaultAddress.id);
                    setBillingAddressId(defaultAddress.id);
                }
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load addresses");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const placeOrder = () => {
        if (!shippingAddressId || !billingAddressId) {
            setError("Please select shipping and billing addresses");
            return;
        }

        setPlacingOrder(true);
        setError("");

        fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                shippingAddressId: Number(shippingAddressId),
                billingAddressId: Number(billingAddressId),
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to place order");
                return response.json();
            })
            .then((data) => {
                navigate(`/orders/${data.id}`);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to place order");
            })
            .finally(() => {
                setPlacingOrder(false);
            });
    };

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading addresses...</h4>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-4">
            <div className="mb-5">
                <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>FINAL STEP</p>
                <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    Checkout
                </h2>
            </div>

            {error && (
                <div className="alert alert-danger bg-danger text-white border-0 glass-panel mb-4">
                    {error}
                </div>
            )}

            {addresses.length === 0 ? (
                <div className="glass-panel p-5 text-center mt-4 mx-auto" style={{ maxWidth: "600px" }}>
                    <h5 className="text-white fw-bold mb-3">No Saved Addresses</h5>
                    <p className="text-secondary mb-4">Please add an address before placing an order.</p>
                    <button className="btn-neon" onClick={() => navigate("/address")}>ADD ADDRESS</button>
                </div>
            ) : (
                <>
                    <div className="glass-panel p-4 mb-5">
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Select Shipping Address</h4>
                        <div className="row g-4">
                            {addresses.map((address) => (
                                <div className="col-md-6 col-lg-4" key={`shipping-${address.id}`}>
                                    <div
                                        className={`glow-card p-3 h-100 ${shippingAddressId === address.id ? "border-neon bg-dark" : "border-secondary bg-transparent"}`}
                                        style={{ borderStyle: "solid", borderWidth: "2px", borderRadius: "12px", cursor: "pointer", transition: "all 0.3s" }}
                                        onClick={() => setShippingAddressId(address.id)}
                                    >
                                        <div className="form-check d-flex align-items-start gap-2">
                                            <input
                                                className="form-check-input mt-1"
                                                type="radio"
                                                name="shippingAddress"
                                                value={address.id}
                                                checked={shippingAddressId === address.id}
                                                onChange={() => setShippingAddressId(address.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <label className="form-check-label text-white w-100" style={{ cursor: "pointer" }}>
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <strong className="text-neon" style={{ letterSpacing: "0.05em" }}>ADDRESS #{address.id}</strong>
                                                    {address.default && <span className="badge bg-secondary text-white" style={{ fontSize: "0.6rem" }}>DEFAULT</span>}
                                                </div>
                                                <p className="text-secondary m-0" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                                                    {address.city}, {address.state} <br />
                                                    {address.postalCode}, {address.country}
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-4 mb-5">
                        <h4 className="text-white fw-bold mb-4 border-bottom border-secondary pb-3">Select Billing Address</h4>
                        <div className="row g-4">
                            {addresses.map((address) => (
                                <div className="col-md-6 col-lg-4" key={`billing-${address.id}`}>
                                    <div
                                        className={`glow-card p-3 h-100 ${billingAddressId === address.id ? "border-neon bg-dark" : "border-secondary bg-transparent"}`}
                                        style={{ borderStyle: "solid", borderWidth: "2px", borderRadius: "12px", cursor: "pointer", transition: "all 0.3s" }}
                                        onClick={() => setBillingAddressId(address.id)}
                                    >
                                        <div className="form-check d-flex align-items-start gap-2">
                                            <input
                                                className="form-check-input mt-1"
                                                type="radio"
                                                name="billingAddress"
                                                value={address.id}
                                                checked={billingAddressId === address.id}
                                                onChange={() => setBillingAddressId(address.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <label className="form-check-label text-white w-100" style={{ cursor: "pointer" }}>
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <strong className="text-neon" style={{ letterSpacing: "0.05em" }}>ADDRESS #{address.id}</strong>
                                                </div>
                                                <p className="text-secondary m-0" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                                                    {address.city}, {address.state} <br />
                                                    {address.postalCode}, {address.country}
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <button
                            className="btn-neon"
                            style={{ padding: "15px 40px", fontSize: "0.9rem" }}
                            onClick={placeOrder}
                            disabled={placingOrder}
                        >
                            {placingOrder ? "PLACING ORDER..." : "PLACE ORDER"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;