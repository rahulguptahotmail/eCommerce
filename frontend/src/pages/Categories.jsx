import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import HomeCart from "../utility/HomeUtils/HomeCart";
import { Link } from "react-router-dom";

const Categories = () => {
  const [items, setItems] = useState([]);
const [orderStatus,setOrderStatus] = useState(false)
  const loaderRef = useRef(null);


const order = ()=>{
  setOrderStatus(true)
  setTimeout(() => {
    setOrderStatus(false)
  }, 1500);
}
// get product 
  const GetProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/singleproduct/${
        window.location.pathname.split("/")[2]
      }`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}}
    );
    loaderRef.current.classList.add("d-none");
    setItems(res.data);
  };

  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <div className=" container">
      <Link to="/" className=" btn btn-primary ms-3 mb-2 fw-bold">
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
      <div className=" row ">
        {items ? (
          items.map((item, idx) => (
            <div key={idx} className=" col-6 col-md-4 col-lg-3 col-xl-2">
              <HomeCart
                image={item.imgPath}
                category={item.category}
                title={item.title}
                price={item.price}
                discount={item.discount}
                order={order}
              />
            </div>
          ))
        ) : (
          <h2>Product Not Found</h2>
        )}
      </div>
    </div>
  );
};

export default Categories;
