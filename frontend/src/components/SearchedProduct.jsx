import React, { useEffect, useState, useRef } from "react";
import HomeCart from "../utility/HomeUtils/HomeCart";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const SearchedProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [tempItems, setTempItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const loaderRef = useRef(null);

  // order
  const order = () => {
    setOrderStatus(true);
    setTimeout(() => {
      setOrderStatus(false);
    }, 1500);
  };

  // get product
  const GetProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/products/searchedproduct/${
          window.location.pathname.split("/")[2]
        }`,
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        loaderRef.current.classList.add("d-none");
        setProduct(res.data.product);
        setTempItems(res.data.allProducts);
      })
      .catch((err) => navigate("/"));
  };
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <div className=" container">
      {/* back  */}
      <Link to={"/"} className=" btn fw-bold border-black shadow btn-info m-2">
        Back
      </Link>
      {orderStatus && (
        <div
          className="alert alert-success w-100 fw-bold text-center"
          role="alert"
        >
          Order Success!
        </div>
      )}
      <div id="loader" className=" w-100 fw-bold p-3" ref={loaderRef}>
        <div className="loader m-auto"></div>
      </div>

      {/* product  */}
      {product && (
        <div className=" d-flex bg-warning bg-opacity-10 rounded p-1 shadow mb-3 flex-wrap gap-3">
          <div className=" col-12 col-md-6 col-lg-4">
            <img
              src={product.imgPath}
              alt="image"
              className=" border rounded w-100"
              style={{ height: "200px" }}
            />
          </div>

          <div className=" col-12 col-md-5 col-lg-4 ">
            <div style={{ marginBottom: "-8px" }}>
              <h6 className=" fw-light ps-1">{product.category}</h6>
            </div>

            <div style={{ marginBottom: "-5px" }}>
              <h6>{product.title}</h6>
            </div>

            <div
              className=" d-flex gap-1 ps-2"
              style={{ marginBottom: "-5px" }}
            >
              <div className=" fw-bold">
                &#8377;
                {product.price - (product.price / 100) * product.discount}
              </div>
              <div className=" text-decoration-line-through fst-italic">
                {product.price}
              </div>
              <div className=" text-success fw-bold">{product.discount}%</div>
            </div>
            <div className=" fs-6">Free Deliver</div>
          </div>
          <div className=" d-flex justify-content-around col-12 col-lg-2 align-items-center gap-2">
            <div
              className=" btn btn-outline-info fw-bold"
              onClick={(e) => dispatch(add(product))}
            >
              Add To Cart
            </div>
            <div
              className=" btn btn-outline-success fw-bold"
              onClick={() => order()}
            >
              Order
            </div>
          </div>
        </div>
      )}

      {/* allproduct */}
      <div className=" row ">
        {tempItems.map((item, idx) => (
          <div key={idx} className=" col-6 col-md-4 col-lg-3 col-xl-2">
            <HomeCart
              category={item.category}
              title={item.title}
              price={item.price}
              discount={item.discount}
              image={item.imgPath}
              id={item._id}
              order={order}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedProduct;
