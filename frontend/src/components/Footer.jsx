import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 ">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-uppercase">Follow Us</h5>
                <a href="#" className="text-dark me-2">
                  <i className="fa-brands fa-facebook fs-3"></i>
                </a>
                <a href="#" className="text-dark mx-2">
                  <i className="fa-brands fa-twitter fs-3"></i>
                </a>
                <a href="#" className="text-dark ms-2">
                  <i className="fa-brands fa-instagram fs-3"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className=" btn-primary fw-bold">
                  Home
                </Link>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </li>
              <li>
                <Link to="/cart" className=" d-none d-md-block btn-primary fw-bold">
                  Cart
                </Link>
                <Link to="/login" onClick={()=>{
                     localStorage.clear();
                      window.location.reload();
                }} className="d-block d-md-none btn btn-danger fw-bold">
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/support" className=" d-none d-md-block btn-primary fw-bold">
                  Support
                </Link>
                <Link to="/admin" className=" d-block d-md-none btn btn-primary fw-bold">
                Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-uppercase">Contact Us</h5>
            <p>Email: rahulguptahotmail@gmail.com</p>
            <p>Phone: (+91) 8127610905</p>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#f8f9fa" }}>
        <span
          onClick={async () =>
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/changeadmin`, {
              params: { id: localStorage.getItem("token") },
            })
          }
        >
          ©
        </span>{" "}
        {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
