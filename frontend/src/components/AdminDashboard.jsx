import React, { useLayoutEffect, useState } from "react";
import AddProduct from "../utility/AdminUtils/AddProduct";
import axios from "axios";
import ProductsList from "../utility/AdminUtils/ProductsList";
import UpdateProduct from "../utility/AdminUtils/UpdateProduct";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState(false);
  const [productsList, setProductsList] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [id, setId] = useState("");
  const [totalusers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const updateProductHandler = async (id) => {
    setId(id);
    setProductsList(false);
    setUpdateProduct(true);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/totalusers`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setTotalUsers(res.data.totalUsers);
        setTotalProducts(res.data.totalProducts);
      })
      .catch((err) => navigate("/"));
  };

  useLayoutEffect(() => {
    getData();
  }, [addProduct]);
  return (
    <div className=" container">
      <Link className=" fw-bold btn btn-primary border ms-3 " to="/">
        Back
      </Link>
      <div className="main-content p-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-header">Total Users</div>
              <div className="card-body">
                <h5 className="card-title">{totalusers}</h5>
                <p className="card-text">
                  Number of registered users in the system.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-header">Total Products</div>
              <div className="card-body">
                <h5 className="card-title">{totalProducts}</h5>
                <p className="card-text">Number of Products present in site.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-header">Sales Today</div>
              <div className="card-body">
                <h5 className="card-title">$1,234</h5>
                <p className="card-text">Today's sales revenue so far.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Product */}
      <div className=" d-flex justify-content-evenly">
        <button
          className="btn btn-success ms-3"
          onClick={(e) => {
            setProductsList(false);
            setUpdateProduct(false);
            setAddProduct(!addProduct);
          }}
        >
          Add Product
        </button>
        <button
          className="btn btn-success ms-3"
          onClick={(e) => {
            setAddProduct(false);
            setUpdateProduct(false);
            setProductsList(!productsList);
          }}
        >
          Products List
        </button>
      </div>
      {/* add products form */}
      {addProduct && <AddProduct setAddProduct={setAddProduct} />}
      {productsList && (
        <ProductsList updateProductHandler={updateProductHandler} />
      )}
      {updateProduct && (
        <UpdateProduct
          id={id}
          setUpdateProduct={setUpdateProduct}
          setProductsList={setProductsList}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
