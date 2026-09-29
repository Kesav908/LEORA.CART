import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Please login to view your profile.");
            setLoading(false);
            return;
        }

        fetch("http://localhost:8080/api/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load profile.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading profile...</h4>
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
        <div className="container py-5 mt-4">
            <div className="mb-5">
                <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>ACCOUNT</p>
                <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    My Profile
                </h2>
            </div>

            <div className="glass-panel p-4 p-md-5 mx-auto" style={{ maxWidth: "600px" }}>
                <h4 className="mb-4 text-white fw-bold border-bottom border-secondary pb-3" style={{ letterSpacing: "0.05em" }}>
                    Personal Information
                </h4>

                <div className="row">
                    <div className="col-sm-6 mb-4">
                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>USER ID</strong>
                        <p className="text-white fs-5 m-0">{user.id}</p>
                    </div>
                    <div className="col-sm-6 mb-4">
                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>EMAIL</strong>
                        <p className="text-white fs-5 m-0">{user.email}</p>
                    </div>
                    <div className="col-sm-6 mb-4">
                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>FIRST NAME</strong>
                        <p className="text-white fs-5 m-0">{user.fName}</p>
                    </div>
                    <div className="col-sm-6 mb-4">
                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>LAST NAME</strong>
                        <p className="text-white fs-5 m-0">{user.lName}</p>
                    </div>
                    <div className="col-sm-6 mb-4">
                        <strong className="text-neon d-block mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>PHONE</strong>
                        <p className="text-white fs-5 m-0">{user.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;