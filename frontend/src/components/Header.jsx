import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const auth = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const searchProduct = async (e) => {
    setSearchValue(e.target.value);
    const value = e.target.value;
    if (value.length <= 0) setSearchStatus(false);
    else {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products/searchalgorithms`, {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
          params: { value },
        })
        .then((res) => {
          setSearchedProducts(res.data.product);
        })
        .catch((err) => navigate('/'));
      setSearchStatus(true);
    }
  };

  return (
    <header className=" w-100">
      <div style={{ height: "70px" }}></div>
      <div className=" bg-body-tertiary shadow position-fixed top-0 w-100 z-3">
        <div className=" container">
          <div className="row align-items-center">
            <div className="col-2 text-start py-1">
              <Link to="/">
                <img
                  src={require("../static/eCommerce-logo.jpg")}
                  alt="logo"
                  className=" rounded-circle shadow border"
                  style={{
                    height: "50px",
                    width: "50px",
                  }}
                />
              </Link>
            </div>
            <div className=" col-7 col-md-4 text-center">
              <form className=" d-flex justify-content-center">
                <input
                  className="form-control rounded"
                  type="search"
                  onMouseOut={() => {
                    if (searchValue.length < 1) setSearchStatus(false);
                  }}
                  placeholder="Search products"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => searchProduct(e)}
                />
{/*                 <button
                  className="btn btn-outline-success rounded-start-0"
                  type="submit"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button> */}
              </form>
            </div>

            <div className="col-md-4 text-end d-none d-md-block ">
              {auth ? (
                <>
                  <Link
                    to="/admin"
                    className="btn btn-outline-dark bg-info bg-opacity-50 fw-bold rounded-end-0 mb-1"
                  >
                    Admin
                  </Link>
                  <Link
                    onClick={(e) => logout()}
                    className="btn btn-danger btn-outline-dark fw-bold rounded-start-0 mt-1"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-dark bg-info bg-opacity-50 fw-bold rounded-end-0 mb-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-danger btn-outline-dark fw-bold rounded-start-0 mt-1"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            <div className=" text-end col-3 col-md-2">
              <Link to="/cart" className="btn btn-outline-dark fw-bold mt-1">
                Cart: {data.length}
              </Link>
            </div>
          </div>
        </div>

        {/* searched products map  */}
        {searchStatus && (
          <div
            className=" border position-absolute bg-body-tertiary rounded col-12 col-md-8 col-lg-6 mx-auto col-sm-10 ms-sm-5 overflow-auto p-3"
            style={{ height: "300px" }}
          >
            {searchedProducts.length === 0 && (
              <h1 className=" text-center">No Result Found</h1>
            )}
            {/* map products  */}

            {searchedProducts.map((item, idx) => (
              <div
                onClick={() => {
                  setSearchValue("");
                  setSearchStatus(false);
                  navigate("/");

                  setTimeout(() => {
                    navigate(`/search/${item._id}`);
                  }, 1);
                }}
              >
                <div key={idx} className=" p-1 border rounded m-1 d-flex">
                  <img
                    src={item.imgPath}
                    alt={idx}
                    className=" rounded shadow border-black"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className=" ms-3">
                    <h5>{item.category}</h5>
                    <h6>{item.title}</h6>
                    <div
                      className=" d-flex gap-1 ps-2"
                      style={{ marginBottom: "-5px" }}
                    >
                      <div className=" fw-bold">
                        &#8377;
                        {item.price - (item.price / 100) * item.discount}
                      </div>
                      <div className=" text-decoration-line-through fst-italic">
                        {item.price}
                      </div>
                      <div className=" text-success fw-bold">
                        {item.discount}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
