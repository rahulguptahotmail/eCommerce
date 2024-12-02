import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice";
import { Link } from "react-router-dom";

const HomeCart = (item) => {
  const dispatch = useDispatch();
  return (
    <div className=" d-flex flex-column bg-warning bg-opacity-10 rounded p-1 shadow">
      {/* image */}
      <div>
        <Link to={`/search/${item.id}`}>
          <img
            // src={require("../../static/eCommerce-logo.jpg")}
            src={item.image}
            alt="image"
            className=" border rounded w-100"
            style={{ height: "150px" }}
          />
        </Link>
      </div>

      {/* categories */}
      <div style={{ marginBottom: "-8px"}}>
        <h6 className=" fw-light ps-1">{item.category}</h6>
      </div>

      {/* title */}
      <div style={{ marginBottom: "-5px" }}>
        {JSON.stringify(item.title).length > 23 ? (
          <h6 title={item.title}>
            {JSON.stringify(item.title).slice(1, 23)}...
          </h6>
        ) : (
          <h6>{item.title}</h6>
        )}
      </div>

      {/* price */}
      <div className=" d-flex gap-1 ps-2" style={{ marginBottom: "-5px" }}>
        <div className=" fw-bold">
          &#8377;{(item.price - (item.price / 100) * item.discount).toFixed(2)}
        </div>
        <div className=" text-decoration-line-through fst-italic">
          {item.price}
        </div>
        <div className=" text-success fw-bold">{item.discount}%</div>
      </div>

      {/* free delivery */}
      <div className=" fs-6">Free Deliver</div>

      {/* order */}
      <div className=" d-flex justify-content-around">
        <div
          className=" btn btn-outline-info fw-bold"
          onClick={(e) => dispatch(add(item))}
        >
          Add To Cart
        </div>
        <div className=" btn btn-outline-success fw-bold" onClick={()=>item.order()}>Order</div>
      </div>
    </div>
  );
};

export default HomeCart;
