import React from "react";
import { Link } from "react-router-dom";

const CategoriesFilter = () => {
  return (
    <div className=" w-100 px-4 gap-5 bg-body-tertiary rounded d-flex justify-content-between overflow-x-auto ">
      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/topoffer"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Top_Offers.webp")}
            alt="TopOffers"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Top Offers</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/mobile"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Mobile_&_Tablets.webp")}
            alt="Mobile_&_Tablets"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Mobiles</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/appliances"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/TVs_&_Appliances.webp")}
            alt="TVs_&_Appliences"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Appliances</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/electronics"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Electronics.webp")}
            alt="Electronics"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Electronics</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/fashion"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Fashion.webp")}
            alt="Fashion"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Fashion</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/beauty"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Beauty.webp")}
            alt="Beauty"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Beauty</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/kitchen"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Home_&_Kitchen.webp")}
            alt="Home_&_Kitchen"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Kitchen</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/furniture"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Furniture.webp")}
            alt="Furniture"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Furniture</h6>
        </Link>
      </div>

      <div className=" d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/singleproduct/grocery"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <img
            src={require("../../static/categories/Grocery.webp")}
            alt="Grocery"
            className=" rounded mt-1"
            style={{ width: "50px" }}
          />
          <h6>Grocery</h6>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesFilter;
