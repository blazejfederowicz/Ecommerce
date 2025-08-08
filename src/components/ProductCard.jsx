import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useState } from "react";

export default function ProductCard({product}){
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants?.[0] || ""
    );
     const dispatch = useDispatch();
    
      const addProduct = (product) => {
        dispatch(addCart(product));
      };

    return(
        <div
        id={product.id}
        className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
        >
            <div className="card text-center shadow-sm w-100 h-100">
                <img
                className="card-img-top p-3"
                src={product.image}
                alt={product.title}
                style={{ height: "300px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">
                        {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text text-muted small">
                        {product.description.substring(0, 90)}...
                    </p>
                    {product.variants && product.variants.length > 0 && (
                        <div className="form-group mt-2">
                            <label htmlFor={`variant-${product.id}`} className="form-label">
                                Choose a Variant:
                            </label>
                            <select
                                id={`variant-${product.id}`}
                                className="form-select"
                                value={selectedVariant}
                                onChange={(e) => setSelectedVariant(e.target.value)}
                            >
                                {product.variants.map((variant, index) => (
                                <option key={index} value={variant}>
                                    {variant}
                                </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lead fw-bold text-dark">
                        ${product.price}
                    </li>
                </ul>
                <div className="card-body d-flex flex-wrap justify-content-center gap-2">
                    {
                        !!product.stock?(
                            <>
                                <Link to={`/product/${product.id}`} className="btn btn-outline-dark">
                                    Buy Now
                                </Link>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                    toast.success("Added to cart");
                                    addProduct({...product,selectedVariant});
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </>):(
                                <p className="lead fw-bold text-dark">Out of stock</p>
                            )
                    }
                    
                </div>
            </div>
        </div>
    )
}