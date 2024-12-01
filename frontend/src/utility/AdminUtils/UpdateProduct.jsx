import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateProduct = (props) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);

  const productImg = (e) => {
    const File = e.target.files[0];
    document.getElementById("productImg").src =
      window.URL.createObjectURL(File);

    setImg(File);
  };

  const AddProductHandler = async (e) => {
    e.preventDefault();

    let imgPath = "";
    setError("");
    // if (!img) return setError("Image Required!");
    if (!title) return setError("Title is Required!");
    else if (!category) return setError("Please Select Category!");
    else if (!price) return setError("Please Enter Amount!");
    else if (!discount || Number(discount) > 99)
      return setError("Please Enter Valid Discount");
    if (img) {
      try {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "eCommerce"); // Replace with your Cloudinary upload preset, make sure unsigned

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dluxlnvq7/upload`, // Replace with your Cloudinary cloud name
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        imgPath = response.data.url;
      } catch (err) {
        return setError("Uploading Failed!");
      }
    } else imgPath = document.getElementById("productImg").src;

    try {
      axios
        .patch(`http://localhost:5000/admin/updateproduct/${props.id}`, {
          title,
          imgPath,
          category,
          price,
          discount,
        },{headers:{Authorization:"bearer "+localStorage.getItem("token")}})
        .then((res) => {
          props.setUpdateProduct(false);
          props.setProductsList(true);
        })
        .catch((err) => setError(err.message));
    } catch (err) {
      setError("Uploading Failed!");
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/getsingleproduct/${props.id}`
    );

    setTitle(res.data.product.title);
    document.getElementById("productImg").src = res.data.product.imgPath;
    setCategory(res.data.product.category);
    setPrice(res.data.product.price);
    setDiscount(res.data.product.discount);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mt-5 border p-4 shadow">
      <h2 className="mb-4 text-center bg-info shadow py-1 border rounded">Update Product</h2>

      <form enctype="multipart/form-data">
        <div className="mb-3 text-center">
          <label htmlFor="productImage" className="form-label">
            <img
              src={require("../../static/eCommerce-logo.jpg")}
              className=" rounded-circle border"
              id="productImg"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </label>
          <input
            type="file"
            className="form-control d-none"
            id="productImage"
            accept="image/*"
            onChange={(e) => productImg(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productTitle" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="mobile">Mobile</option>
            <option value="appliances">Appliances</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="kitchen">Kitchen</option>
            <option value="furniture">Furniture</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price ($)
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDiscount" className="form-label">
            Discount (%)
          </label>
          <input
            type="number"
            className="form-control"
            id="productDiscount"
            min="0"
            max="100"
            step="1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        {error && <h6 className=" text-danger">{error}</h6>}
        {uploadProgress && (
          <h4 className=" text-center">Uploading {uploadProgress}%</h4>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => AddProductHandler(e)}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
