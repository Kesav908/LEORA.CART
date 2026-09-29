import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fName,
                        lName,
                        email,
                        phone,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setSuccess("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    };

    return (
        <div className="container py-5 mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="glass-panel p-4 p-md-5">
                        <div className="text-center mb-5">
                            <p className="text-neon fw-bold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>JOIN US</p>
                            <h3 className="text-white fw-bold m-0" style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}>Create Account</h3>
                        </div>

                        {error && (
                            <div className="alert alert-danger bg-danger text-white border-0 mb-4">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success bg-success text-white border-0 mb-4">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>FIRST NAME</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        value={fName}
                                        onChange={(e) => setFName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>LAST NAME</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-secondary custom-input"
                                        value={lName}
                                        onChange={(e) => setLName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>EMAIL</label>
                                <input
                                    type="email"
                                    className="form-control bg-transparent text-white border-secondary custom-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    className="form-control bg-transparent text-white border-secondary custom-input"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    maxLength="10"
                                    pattern="[6-9][0-9]{9}"
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>PASSWORD</label>
                                <input
                                    type="password"
                                    className="form-control bg-transparent text-white border-secondary custom-input mb-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength="8"
                                    required
                                />
                                <small className="text-secondary" style={{ fontSize: "0.75rem" }}>
                                    Password must contain at least 8 characters.
                                </small>
                            </div>

                            <button type="submit" className="btn-neon w-100">
                                Register
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <span className="text-secondary" style={{ fontSize: "0.85rem" }}>Already have an account? </span>
                            <Link to="/login" className="text-neon text-decoration-none fw-bold" style={{ fontSize: "0.85rem" }}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-input:focus {
                    border-color: var(--neon-accent) !important;
                    box-shadow: 0 0 10px rgba(0, 255, 204, 0.2) !important;
                    background-color: rgba(255, 255, 255, 0.05) !important;
                }
            `}</style>
        </div>
    );
}

export default Register;
