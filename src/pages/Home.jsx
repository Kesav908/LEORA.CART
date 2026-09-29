import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                // Show only the first 4 products on homepage
                setProducts(data.slice(0, 4));
                setLoadingProducts(false);
            })
            .catch((error) => {
                console.error("Failed to load homepage products:", error);
                setLoadingProducts(false);
            });

    }, []);

    const categories = [
        {
            title: "MEN",
            description: "Essential styles for everyday wear.",
            image: "/categories/men.png",
        },
        {
            title: "WOMEN",
            description: "Modern pieces designed to stand out.",
            image: "/categories/women.png",
        },
        {
            title: "KIDS",
            description: "Comfortable styles for every day.",
            image: "/categories/kids.png",
        },
    ];

    return (
        <div style={{ backgroundColor: "var(--bg-primary)" }}>

            {/* HERO SECTION */}
            <section className="position-relative overflow-hidden d-flex align-items-center" style={{ minHeight: "78vh" }}>
                {/* Background LEORA Text */}
                <div
                    className="position-absolute top-50 start-50 translate-middle w-100 text-center user-select-none"
                    style={{ zIndex: 0, pointerEvents: "none" }}
                >
                    <h1
                        className="m-0 fw-bold text-gradient"
                        style={{
                            fontSize: "clamp(6rem, 21vw, 20rem)",
                            opacity: 0.05,
                            lineHeight: 0.8,
                            letterSpacing: "-0.08em",
                        }}
                    >
                        LEORA
                    </h1>
                </div>

                <div className="container-fluid px-4 px-md-5 position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center" style={{ minHeight: "62vh" }}>
                        {/* LEFT */}
                        <div className="col-12 col-md-4">
                            <div style={{ borderLeft: "3px solid var(--neon-accent)", paddingLeft: "20px", maxWidth: "260px" }}>
                                <p className="fw-bold text-uppercase mb-2 text-neon" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", lineHeight: "1.7" }}>
                                    DISCOVER<br />YOUR EVERYDAY<br />ESSENTIALS.
                                </p>
                                <p className="mb-0 text-white" style={{ fontSize: "0.8rem", lineHeight: "1.7", opacity: 0.8 }}>
                                    Curated styles designed for modern everyday living.
                                </p>
                            </div>
                        </div>

                        {/* CENTER */}
                        <div className="col-12 col-md-4"></div>

                        {/* RIGHT */}
                        <div className="col-12 col-md-4 text-md-end mt-5 mt-md-0">
                            <div className="fw-bold text-uppercase text-white" style={{ fontSize: "0.75rem", lineHeight: "1.7", letterSpacing: "0.1em" }}>
                                NEW<br />COLLECTION<br />
                                <span className="text-neon">2026</span>
                            </div>
                        </div>
                    </div>

                    {/* HERO BUTTONS */}
                    <div className="row mt-4 mt-md-0">
                        <div className="col-12">
                            <div className="d-flex flex-wrap align-items-center gap-4">
                                <Link to="/products" className="btn-neon">SHOP COLLECTION</Link>
                                <Link to="/products" className="fw-bold text-uppercase text-decoration-none text-white" style={{ fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--neon-accent)", paddingBottom: "5px", transition: "all 0.3s" }}>
                                    VIEW ALL PRODUCTS →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHOPPING BENEFITS */}
            <section className="glass-panel mx-4 mx-md-5 my-5">
                <div className="container-fluid px-4 py-5">
                    <div className="row text-center gy-4">
                        {['FREE SHIPPING', 'SECURE PAYMENT', 'EASY RETURNS', 'QUALITY PRODUCTS'].map((benefit, i) => (
                            <div className="col-6 col-md-3" key={i}>
                                <div className="fw-bold text-neon mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                                    {benefit}
                                </div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                                    {i === 0 ? 'On eligible orders' : i === 1 ? 'Safe & secure checkout' : i === 2 ? 'Hassle-free returns' : 'Carefully selected'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="py-5">
                <div className="container-fluid px-4 px-md-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>SHOP</p>
                            <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}>
                                Shop by Category
                            </h2>
                        </div>
                        <Link to="/products" className="d-none d-md-block text-decoration-none fw-bold text-neon" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--neon-accent)", paddingBottom: "5px" }}>
                            VIEW ALL →
                        </Link>
                    </div>

                    <div className="row g-4">
                        {categories.map((category) => (
                            <div className="col-12 col-md-4" key={category.title}>
                                <Link to="/products" className="text-decoration-none d-block">
                                    <div className="position-relative overflow-hidden rounded category-glow" style={{ height: "480px" }}>
                                        <img src={category.image} alt={category.title} className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
                                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9), transparent 60%)" }}></div>
                                        <div className="position-absolute bottom-0 start-0 w-100 p-4">
                                            <h3 className="fw-bold mb-2 text-white" style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}>{category.title}</h3>
                                            <p className="mb-3 text-secondary" style={{ fontSize: "0.8rem", maxWidth: "230px", lineHeight: "1.6" }}>{category.description}</p>
                                            <span className="fw-bold text-neon" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>SHOP NOW →</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW ARRIVALS */}
            <section className="py-5">
                <div className="container-fluid px-4 px-md-5">
                    <div className="row align-items-end mb-5">
                        <div className="col-md-8">
                            <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>JUST DROPPED</p>
                            <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}>New Arrivals</h2>
                        </div>
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <Link to="/products" className="text-decoration-none fw-bold text-neon" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--neon-accent)", paddingBottom: "5px" }}>SHOP ALL PRODUCTS →</Link>
                        </div>
                    </div>

                    {loadingProducts ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-neon" role="status" style={{ width: "2rem", height: "2rem" }}></div>
                            <p className="mt-3 mb-0 text-white" style={{ fontSize: "0.8rem" }}>Loading products...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-5 glass-panel p-5">
                            <p className="mb-4 text-white" style={{ fontSize: "1rem" }}>No products available right now.</p>
                            <Link to="/products" className="btn-neon">VIEW PRODUCTS</Link>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {products.map((product) => (
                                <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                                    <Link to="/products" className="text-decoration-none d-block glow-card p-3">
                                        <div className="position-relative rounded mb-3" style={{ backgroundColor: "rgba(255,255,255,0.02)", aspectRatio: "0.8", overflow: "hidden" }}>
                                            <img src={`/products/${product.id % 4}.png`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            {product.stockQuantity === 0 && (
                                                <span className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-danger text-white rounded" style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}>OUT OF STOCK</span>
                                            )}
                                        </div>
                                        <div className="pt-1">
                                            <p className="mb-1 fw-bold text-white" style={{ fontSize: "0.9rem" }}>{product.name}</p>
                                            <p className="mb-3 text-secondary text-truncate" style={{ fontSize: "0.75rem" }}>{product.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0 fw-bold text-neon" style={{ fontSize: "1rem" }}>₹{Number(product.price).toLocaleString("en-IN")}</p>
                                                {product.stockQuantity > 0 && <span style={{ fontSize: "0.65rem", color: "var(--neon-accent)" }}>IN STOCK</span>}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-5 mb-5 mt-4">
                <div className="container-fluid px-4 px-md-5 text-center glass-panel" style={{ padding: "80px 20px" }}>
                    <p className="fw-bold mb-3 text-gradient" style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}>LEORA</p>
                    <h2 className="fw-bold mb-5 text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.06em", textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
                        FIND YOUR NEXT<br />FAVORITE.
                    </h2>
                    <Link to="/products" className="btn-neon" style={{ padding: "16px 40px", fontSize: "0.8rem" }}>START SHOPPING</Link>
                </div>
            </section>

        </div>
    );
};

export default Home;