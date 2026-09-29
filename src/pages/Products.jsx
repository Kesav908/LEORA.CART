import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const [addingProductId, setAddingProductId] = useState(null);
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {

        fetch("http://localhost:8080/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load products");
                setLoading(false);
            });

    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredProducts(products.filter(p => 
                p.name.toLowerCase().includes(searchQuery) || 
                (p.description && p.description.toLowerCase().includes(searchQuery))
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

    const addToCart = async (productId) => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login to add products to cart");
            return;
        }

        setAddingProductId(productId);
        setCartMessage("");

        try {

            const response = await fetch(
                "http://localhost:8080/cart/items",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: productId,
                        quantity: 1
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Add to cart failed:", errorText);
                throw new Error("Failed to add product to cart");
            }

            await response.json();

            setCartMessage("Product added to cart!");

            setTimeout(() => {
                setCartMessage("");
            }, 2000);

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setAddingProductId(null);
        }
    };

    if (loading) {
        return (
            <div className="container py-5 mt-4 text-center">
                <div className="spinner-border text-neon" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <h4 className="mt-3 text-white">Loading products...</h4>
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

            <div className="d-flex justify-content-between align-items-end mb-5">
                <div>
                    <p className="mb-2 fw-bold text-neon" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>COLLECTION</p>
                    <h2 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                        {searchQuery ? `Search: "${searchQuery}"` : "All Products"}
                    </h2>
                </div>
            </div>

            {cartMessage && (
                <div className="alert alert-success bg-success text-white border-0 glass-panel mb-4">
                    {cartMessage}
                </div>
            )}

            <div className="row g-4">
                {filteredProducts.length === 0 && !loading && (
                    <div className="col-12 text-center text-secondary py-5">
                        <p style={{ fontSize: "1.2rem" }}>No products found matching "{searchQuery}"</p>
                    </div>
                )}
                {filteredProducts.map((product) => (
                    <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                        <div className="glow-card glass-panel p-4 h-100 d-flex flex-column text-center">
                            
                            <div className="mb-4 rounded d-flex align-items-center justify-content-center position-relative" style={{ backgroundColor: "rgba(255,255,255,0.03)", height: "200px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                                <img src={`/products/${product.id % 4}.png`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                {product.stockQuantity === 0 && (
                                    <span className="position-absolute top-0 start-0 m-3 px-2 py-1 bg-danger text-white rounded" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                                        OUT OF STOCK
                                    </span>
                                )}
                            </div>

                            <h5 className="text-white fw-bold mb-2 fs-4">{product.name}</h5>
                            <p className="text-secondary mb-4" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{product.description}</p>
                            
                            <div className="mt-auto">
                                <h3 className="text-neon fw-bold mb-3">₹{Number(product.price).toLocaleString("en-IN")}</h3>
                                <p className="text-secondary mb-4" style={{ fontSize: "0.8rem" }}>Stock: {product.stockQuantity}</p>

                                <button
                                    className="btn-neon w-100"
                                    onClick={() => addToCart(product.id)}
                                    disabled={addingProductId === product.id || product.stockQuantity === 0}
                                    style={{ opacity: product.stockQuantity === 0 ? 0.5 : 1 }}
                                >
                                    {addingProductId === product.id
                                        ? "Adding..."
                                        : product.stockQuantity === 0 
                                            ? "Out of Stock" 
                                            : "Add to Cart"}
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Products;
