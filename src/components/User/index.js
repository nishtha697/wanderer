import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import "./user.css";
import Profile from "../ProfileScreen/Profile";

const User = () => {
  const history = useHistory();
  let [loggedIn, setLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState({
    role: "user",
    name: "",
    birthdate: "",
    photo: "",
    cover: "",
    lastname: "",
    password: "",
    email: "",
    description: "",
  });

  let [provider, setProvider] = useState({
    user_Id: "",
    verified: false,
    address: "",
    contact: "",
    carddetails: -1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", newUser.role);
    formData.append("photo", newUser.photo);
    formData.append("password", newUser.password);
    formData.append("birthdate", newUser.birthdate);
    formData.append("name", newUser.name);
    formData.append("lastname", newUser.lastname);
    formData.append("email", newUser.email);
    formData.append("cover", newUser.cover);
    formData.append("description", newUser.description);

    axios
      .post("http://localhost:4000/users/add/", formData)
      .then((res) => {
        setProvider({ ...provider, user_Id: res.data._id });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });

    if (newUser.role === "provider") {
      fetch("http://localhost:4000/api/registration", {
        method: "POST",
        body: provider,
      })
        .then((res) => res.json())
        .then((user) => console.log(user));
    }

    setLoggedIn(true);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, name: e.target.value });
  };

  const handleRoleChange = (e) => {
    setNewUser({ ...newUser, role: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewUser({ ...newUser, birthdate: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewUser({ ...newUser, lastname: e.target.value });
  };

  const handleEmailChange = (e) => {
    setNewUser({ ...newUser, email: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewUser({ ...newUser, description: e.target.value });
  };

  const handleAddressChange = (e) => {
    setProvider({ ...provider, address: e.target.value });
  };

  const handleCardChange = (e) => {
    setProvider({ ...provider, carddetails: e.target.value });
  };

  const handleContactChange = (e) => {
    setProvider({ ...provider, contact: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  const handleCover = (e) => {
    setNewUser({ ...newUser, cover: e.target.files[0] });
  };

  // console.log(loggedIn);
  // if (loggedIn) {
  //   return <Profile />;
  // }

  return (
    // <div className="">
    //   <form onSubmit={handleSubmit} encType="multipart/form-data">

    //     <input type="submit" />
    //   </form>
    // </div>

    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            placeholder="First name"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example1c">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            placeholder="Last name"
                            name="lastname"
                            value={newUser.lastname}
                            onChange={handleLastNameChange}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example1c">
                            Last Name
                          </label>
                        </div>
                      </div>
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
                          <label className="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="date"
                            name="birthdate"
                            value={newUser.birthdate}
                            onChange={handleDateChange}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example3c">
                            Date of Birth
                          </label>
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
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="photo"
                            onChange={handlePhoto}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example4cd">
                            Add profile photo
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="cover"
                            onChange={handleCover}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example4cd">
                            Add cover photo
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            placeholder="Add profile description"
                            name="description"
                            value={newUser.description}
                            onChange={handleDescriptionChange}
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example3c">
                            Profile description
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <select
                            value={newUser.role}
                            onChange={handleRoleChange}
                            className="form-control"
                          >
                            <option value="user">User</option>
                            <option value="provider">Provider</option>
                          </select>
                          <label className="form-label" for="form3Example1c">
                            Role
                          </label>
                        </div>
                      </div>
                      {newUser.role === "provider" && (
                        <>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                placeholder="Add address"
                                name="address"
                                value={provider.address}
                                onChange={handleAddressChange}
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                for="form3Example3c"
                              >
                                Address
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                placeholder="Add credit card details"
                                name="carddetails"
                                value={provider.carddetails}
                                onChange={handleCardChange}
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                for="form3Example3c"
                              >
                                Credit card details
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                placeholder="Add Contact"
                                name="contact"
                                value={provider.contact}
                                onChange={handleContactChange}
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                for="form3Example3c"
                              >
                                Contact
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" for="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input
                          type="submit"
                          value="Register"
                          className="btn btn-primary btn-lg"
                        />
                        {/* Register
                        </button> */}
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
  );
};

export default User;
