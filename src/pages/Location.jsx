import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Location = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            setError("Please login to view your addresses.");
            setLoading(false);
            return;
        }
        fetchAddresses();
    }, [token]);

    const fetchAddresses = () => {
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
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load addresses.");
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this address?")) return;
        
        fetch(`http://localhost:8080/addresses/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete address");
            }
            // Remove the deleted address from the state
            setAddresses(addresses.filter(addr => addr.id !== id));
        })
        .catch((err) => {
            console.error(err);
            alert("Error deleting address");
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
            <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
                <div>
                    <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>SAVED LOCATIONS</p>
                    <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                        My Addresses
                    </h2>
                </div>
                <Link to="/address" className="btn-neon">
                    ADD NEW ADDRESS
                </Link>
            </div>

            {addresses.length === 0 ? (
                <div className="glass-panel p-5 text-center mt-4 mx-auto" style={{ maxWidth: "600px" }}>
                    <h5 className="text-white fw-bold mb-3">No Saved Addresses</h5>
                    <p className="text-secondary mb-4">You haven't saved any delivery addresses yet.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {addresses.map((address) => (
                        <div className="col-md-6 col-lg-4" key={address.id}>
                            <div className="glass-panel glow-card p-4 h-100 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <strong className="text-neon" style={{ letterSpacing: "0.05em" }}>ADDRESS #{address.id}</strong>
                                    {address.default && (
                                        <span className="badge bg-secondary text-white" style={{ fontSize: "0.6rem" }}>DEFAULT</span>
                                    )}
                                </div>
                                <p className="text-white m-0 mb-4" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                    {address.city}, {address.state} <br />
                                    {address.postalCode}, {address.country}
                                </p>
                                <div className="mt-auto d-flex justify-content-end">
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => handleDelete(address.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Location;
