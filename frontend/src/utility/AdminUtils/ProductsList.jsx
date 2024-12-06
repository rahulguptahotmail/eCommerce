import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsList = ({ updateProductHandler }) => {
  const [items, setItems] = useState([]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/deleteproduct/${id}`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}});
    } catch (err) {
      alert("invalid product id");
    }
  };

  const getData = async () => {
     await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/productslist`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}}
    ).then((res)=>setItems(res.data.totalProducts)).catch((err)=>console.log(err))
    
  };
  useEffect(() => {
    getData();
  }, [deleteProduct]);
  return (
    <div className=" container">
      <ul className=" bg-body-secondary p-2 my-2 list-unstyled">
        <div className=" d-flex justify-content-between p-2">
          <div className=" fw-bold ms-2 ">Image</div>
          <div className=" fw-bold ms-2 ">Category & Title</div>
          <div className=" fw-bold  ">Price & Discount</div>
          <div className=" d-none d-sm-block fw-bold">Actions</div>
        </div>
        {items.map((item, idx) => (
          <>
            <li className=" border my-2 rounded bg-body-tertiary">
              <div className=" d-flex justify-content-between align-items-center">
                <div className=" d-flex gap-2 align-items-center">
                  <h3 className=" px-2">{idx + 1}</h3>
                  <img
                    src={item.imgPath}
                    alt=""
                    className=" rounded shadow border"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
                <div className=" d-flex flex-column justify-content-center align-items-center ms-2">
                  <h6 className=" fw-lighter">{item.category.toUpperCase()}</h6>
                  <h5 className=" fst-italic" title={item.title}>
                    {JSON.stringify(item.title).slice(1, 25)}...
                  </h5>
                </div>
                <div className=" d-flex flex-column justify-content-between align-items-center me-2">
                  <div className=" fw-bold">
                    &#8377;{(item.price - (item.price / 100) * item.discount).toFixed(2)}
                  </div>
                  <div className=" text-decoration-line-through fst-italic">
                    {item.price}
                  </div>
                  <div className=" text-success fw-bold">{item.discount}%</div>
                </div>
                <div className=" d-none d-sm-block">
                  <div className=" d-flex me-2 gap-2">
                    <button
                      className=" btn btn-primary"
                      onClick={() => updateProductHandler(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className=" btn btn-danger"
                      onClick={(e) => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className=" d-block d-sm-none">
                <div className=" d-flex gap-2 my-2 justify-content-evenly">
                  <button className=" btn btn-primary"
                  onClick={() => updateProductHandler(item._id)}>Edit</button>
                  <button
                    className=" btn btn-danger"
                    onClick={(e) => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
