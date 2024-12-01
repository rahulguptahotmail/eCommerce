import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(0);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName) setError("Please Enter Full Name");
    else if (mobile.length > 10 || mobile.length < 10)
      setError("Please Enter a Valid Mobile Number");
    else if (password.length < 6)
      setError("Password should be at least 6 digits");
    else if (password !== password2) setError("Password not matched");
    else {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
          fullName,
          mobile,
          password,
        })
        .then((res) => {
          localStorage.setItem('token',res.data.token)
          navigate('/');
        })
        .catch((err) => {
          setError(err.response.data.message)
        });
    }
  };

  return (
    <div>
      <section
        className="vh-80
        
        bg-image"
        style={{
          backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)`,
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card my-5" style={{ borderRadius: "15px" }}>
                  <div className="card-body px-5 bg-info bg-opacity-10">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>

                    <form>
                      <div data-mdb-input-init className="form-outline mb-2">
                        <input
                          type="text"
                          id="form3Example1cg"
                          placeholder="FullName"
                          className="form-control form-control-lg shadow border-2"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example1cg"
                        >
                          FullName
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-2">
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          id="form3Example3cg"
                          className="form-control form-control-lg shadow border-2"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example3cg"
                        >
                          Phone Number
                        </label>
                      </div>

                      <div
                        data-mdb-input-init
                        className="form-outline mb-2  position-relative"
                      >
                        {passView ? (
                          <input
                            type="text"
                            id="form3Example4cg"
                            placeholder="Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        ) : (
                          <input
                            type="password"
                            id="form3Example4cg"
                            placeholder="Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        )}
                        <p
                          className=" position-absolute pointer "
                          style={{ left: "90%", bottom: "35%" }}
                          onClick={() => setPassView(!passView)}
                        >
                          {passView ? (
                            <i className="fa-regular fa-eye"></i>
                          ) : (
                            <i className="fa-regular fa-eye-slash"></i>
                          )}
                        </p>
                        <label
                          className="form-label"
                          htmlFor="form3Example4cg"
                        >
                          Password
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-2">
                        {passView ? (
                          <input
                            type="text"
                            id="form3Example4cdg"
                            placeholder="Repeat Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                          />
                        ) : (
                          <input
                            type="password"
                            id="form3Example4cdg"
                            placeholder="Repeat Password"
                            className="form-control form-control-lg shadow border-2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                          />
                        )}
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Repeat your password
                        </label>
                      </div>

                      <div className=" text-danger mb-2 ms-3">{error}</div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn fw-bold shadow btn-success btn-block btn-lg gradient-custom-4 text-body d-flex align-items-center gap-1"
                          onClick={(e) => submitHandler(e)}
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold fs-5 text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
