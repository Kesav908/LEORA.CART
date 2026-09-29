import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        fetch("http://localhost:8080/addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to create address");
                return response.json();
            })
            .then((data) => {
                navigate("/checkout");
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to create address");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container py-5 mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="glass-panel p-4 p-md-5">
                        
                        <div className="text-center mb-5">
                            <p className="text-neon fw-bold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>SHIPPING</p>
                            <h3 className="text-white fw-bold m-0" style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}>Add Address</h3>
                        </div>

                        {error && (
                            <div className="alert alert-danger bg-danger text-white border-0 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4 mb-4">
                                <div className="col-sm-6">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>CITY</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>STATE</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row g-4 mb-4">
                                <div className="col-sm-6">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>POSTAL CODE</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>COUNTRY</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-check mb-5 d-flex align-items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input m-0 custom-checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    id="defaultAddressCheck"
                                />
                                <label className="form-check-label text-secondary m-0" htmlFor="defaultAddressCheck" style={{ fontSize: "0.85rem", cursor: "pointer" }}>
                                    Set as default address
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn-neon w-100"
                                disabled={loading}
                            >
                                {loading ? "SAVING..." : "SAVE ADDRESS"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-input:focus {
                    border-color: var(--neon-accent) !important;
                    box-shadow: 0 0 10px rgba(0, 255, 204, 0.2) !important;
                    background-color: rgba(255, 255, 255, 0.05) !important;
                }
                .custom-checkbox:checked {
                    background-color: var(--neon-accent) !important;
                    border-color: var(--neon-accent) !important;
                }
            `}</style>
        </div>
    );
};

export default Address;