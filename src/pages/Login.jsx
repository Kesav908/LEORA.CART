import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            login(data.token);
            navigate("/");

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="glass-panel p-4 p-md-5">
                        <div className="text-center mb-5">
                            <p className="text-neon fw-bold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>WELCOME BACK</p>
                            <h3 className="text-white fw-bold m-0" style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}>Login</h3>
                        </div>

                        {error && (
                            <div className="alert alert-danger bg-danger text-white border-0 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
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

                            <div className="mb-5">
                                <label className="form-label text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>PASSWORD</label>
                                <input
                                    type="password"
                                    className="form-control bg-transparent text-white border-secondary custom-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-neon w-100">
                                Login
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <span className="text-secondary" style={{ fontSize: "0.85rem" }}>Don't have an account? </span>
                            <Link to="/register" className="text-neon text-decoration-none fw-bold" style={{ fontSize: "0.85rem" }}>
                                Register
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

export default Login;