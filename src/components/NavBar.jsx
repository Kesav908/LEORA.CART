import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    User,
    ShoppingBag,
    Menu,
    X,
    LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { isLoggedIn, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const closeMenu = () => setMenuOpen(false);

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            closeMenu();
        }
    };

    return (
        <nav className="glass-nav position-sticky top-0 z-3" style={{ zIndex: 1000 }}>
            <div className="container-fluid px-4 px-md-5">

                {/* ================= TOP ROW ================= */}
                <div
                    className="position-relative d-flex align-items-center justify-content-between"
                    style={{ height: "76px" }}
                >
                    {/* LOGO */}
                    <div style={{ flex: "1" }}>
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="text-decoration-none text-gradient"
                            style={{
                                fontSize: "1.65rem",
                                fontWeight: 900,
                                letterSpacing: "-0.06em",
                            }}
                        >
                            LEORA
                        </Link>
                    </div>

                    {/* SEARCH */}
                    <div
                        className="d-none d-lg-flex align-items-center position-absolute start-50 translate-middle-x"
                        style={{
                            width: "340px",
                            bottom: "15px",
                            borderBottom: "1px solid var(--border-color)",
                        }}
                    >
                        <Search
                            size={18}
                            strokeWidth={1.5}
                            style={{
                                marginRight: "10px",
                                flexShrink: 0,
                                color: "var(--text-secondary)"
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Search products"
                            className="border-0 bg-transparent w-100 text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                outline: "none",
                                fontSize: "0.72rem",
                                letterSpacing: "0.03em",
                                padding: "8px 0",
                            }}
                        />
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div
                        className="d-flex align-items-center justify-content-end gap-3 gap-md-4"
                        style={{ flex: "1" }}
                    >
                        {/* LOCATION */}
                        <Link
                            to="/location"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={iconLinkStyle}
                        >
                            <MapPin size={19} strokeWidth={1.5} />
                            <span className="d-none d-xl-inline">LOCATION</span>
                        </Link>

                        {/* PROFILE */}
                        <Link
                            to={isLoggedIn ? "/profile" : "/login"}
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={iconLinkStyle}
                        >
                            <User size={19} strokeWidth={1.5} />
                            <span className="d-none d-xl-inline">
                                {isLoggedIn ? "PROFILE" : "LOGIN"}
                            </span>
                        </Link>

                        {/* CART */}
                        <Link
                            to="/cart"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={iconLinkStyle}
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            <span className="d-none d-xl-inline">CART</span>
                        </Link>

                        {/* LOGOUT */}
                        {isLoggedIn && (
                            <button
                                onClick={logout}
                                className="d-none d-lg-flex align-items-center gap-2 border-0 bg-transparent text-white"
                                style={{
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.08em",
                                    cursor: "pointer",
                                    padding: 0,
                                }}
                            >
                                <LogOut size={17} strokeWidth={1.5} />
                                LOGOUT
                            </button>
                        )}

                        {/* MOBILE MENU */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="d-lg-none border-0 bg-transparent p-0 text-white"
                            style={{ cursor: "pointer" }}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <X size={24} strokeWidth={1.5} />
                            ) : (
                                <Menu size={24} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                </div>

                {/* ================= DESKTOP SEARCH (Mobile Fallback) ================= */}
                <div className="d-lg-none pb-3">
                    <div
                        className="d-flex align-items-center"
                        style={{ borderBottom: "1px solid var(--border-color)" }}
                    >
                        <Search
                            size={18}
                            strokeWidth={1.5}
                            style={{ marginRight: "10px", color: "var(--text-secondary)" }}
                        />
                        <input
                            type="text"
                            placeholder="Search products"
                            className="border-0 bg-transparent w-100 text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                outline: "none",
                                fontSize: "0.72rem",
                                padding: "9px 0",
                            }}
                        />
                    </div>
                </div>

                {/* ================= NAVIGATION ================= */}
                <div className={`${menuOpen ? "d-block" : "d-none"} d-lg-block pb-3 pb-lg-0`}>
                    <div
                        className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4 gap-md-5"
                        style={{ height: "auto", minHeight: "48px" }}
                    >
                        <Link to="/" onClick={closeMenu} className="premium-nav-link">HOME</Link>
                        <Link to="/products" onClick={closeMenu} className="premium-nav-link">SHOP</Link>
                        {isLoggedIn && (
                            <Link to="/orders" onClick={closeMenu} className="premium-nav-link">ORDERS</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= STYLES ================= */}
            <style>
                {`
                    .premium-nav-link {
                        color: var(--text-primary);
                        text-decoration: none;
                        font-size: 0.72rem;
                        font-weight: 600;
                        letter-spacing: 0.12em;
                        position: relative;
                        transition: color 0.3s;
                    }
                    .premium-nav-link::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: -5px;
                        width: 0;
                        height: 2px;
                        background: var(--neon-accent);
                        transition: width 0.3s ease;
                        box-shadow: 0 0 8px var(--neon-accent);
                    }
                    .premium-nav-link:hover::after {
                        width: 100%;
                    }
                    .premium-nav-link:hover {
                        color: var(--neon-accent) !important;
                    }
                    input::placeholder {
                        color: var(--text-secondary);
                        opacity: 1;
                    }
                `}
            </style>
        </nav>
    );
}

const iconLinkStyle = {
    color: "var(--text-primary)",
    fontSize: "0.68rem",
    letterSpacing: "0.07em",
    transition: "color 0.3s",
};

export default NavBar;
