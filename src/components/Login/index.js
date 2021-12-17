import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Navbar from "../NavBar/Navbar";

const Login = () => {
  let history = useHistory();
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const handlePasswordChange = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
  };

  const handleEmailChange = (e) => {
    setNewUser({ ...newUser, email: e.target.value });
  };

  // const [userData, setUserData] = useContext(UserContext);
  const [userData, setUserData] = useState({});
  let [error, setError] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);

      const res = await axios.post(
        "http://18.222.87.70:4000/users/login/",
        formData
      );

      console.log(res);

      setUserData({
        token: res.data.token,
        user: res.data.resUser,
      });
      localStorage.setItem("auth-token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.resUser));
      // console.log(localStorage.getItem("user"));
      if (res.data.resUser.role === "admin") {
        history.push("/admin");
      } else {
        history.push("/");
      }

      // console.log(loginRes.data.user);
    } catch (err) {
      // console.log(err);
      setError("Invalid credentials. Please try again!");
      // err.response.data.msg && setError(err.response.data.msg);
    }

    // fetch("http://localhost:4000/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(newUser),
    //   credentials: "include",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    //   .then((status) => history.push("/"))
    //   .catch((err) => console.log(err));
  };
  return (
    // <div className="">
    //   <form onSubmit={handleSubmit} encType="multipart/form-data">

    //     <input type="submit" />
    //   </form>
    // </div>
    <>
      <Navbar />
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log in
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={newUser.email}
                              onChange={handleEmailChange}
                              className="form-control"
                            />
                            <label className="form-label">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={newUser.password}
                              onChange={handlePasswordChange}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>
                        {error && <p>{error}</p>}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            value="Login"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
