import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [orderStatus, setOrderStatus] = useState(false);
  const [singleOrder, setSingleOrder] = useState(false);

  let price = 0;
  cartItems.forEach((item) => {
    // price += Number(item.price);
   price += (item.price - (item.price / 100) * item.discount)
  });

  // orderAll
  const orderAll = () => {
    dispatch(clear());
    setOrderStatus(true);
  };

  // orderSingle
  const orderSingle = (id) => {
    dispatch(remove(id));
    setSingleOrder(true);
    setTimeout(() => {
      setSingleOrder(false);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <Link to="/" className=" btn btn-outline-danger btn-sm ms-3 mb-3 fw-bold">
        Back
      </Link>
      <h2 className="mb-4">Shopping Cart</h2>
      {singleOrder && (
        <div className="alert alert-success w-100" role="alert">
          Order Success!
        </div>
      )}
      {cartItems.length === 0 ? (
        orderStatus ? (
          <div className="alert alert-success" role="alert">
            Order Successfully!
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Your cart is empty!
          </div>
        )
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category & Title</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.uniqueId} className=" border">
                  <td>
                    <img
                      //   src={require("../static/eCommerce-logo.jpg")}
                      src={item.image}
                      alt={item._id}
                      className=" border shadow rounded"
                      style={{ width: "80px", maxHeight: "100px" }}
                    />
                  </td>
                  <td>
                    <p className=" fw-light">{item.category.toUpperCase()}</p>
                    {JSON.stringify(item.title).length > 24 ? (
                      <p title={item.title}>
                        {JSON.stringify(item.title).slice(1, 23)}...
                      </p>
                    ) : (
                      <p>{item.title}</p>
                    )}
                  </td>
                  <td>${(item.price - (item.price / 100) * item.discount).toFixed(2)}</td>
                  <td className=" d-flex gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => dispatch(remove(item.uniqueId))}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => orderSingle(item.uniqueId)}
                    >
                      Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-right">Total: ${price}</h4>
          <button className="btn btn-primary mt-3" onClick={(e) => orderAll()}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
