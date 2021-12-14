import React, { useState } from "react";
import axios from "axios";
import "./user.css";

const User = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    birthdate: "",
    photo: "",
    cover: "",
    lastname: "",
    email: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("birthdate", newUser.birthdate);
    formData.append("name", newUser.name);
    formData.append("lastname", newUser.lastname);
    formData.append("email", newUser.email);
    formData.append("cover", newUser.cover);
    formData.append("description", newUser.description);

    axios
      .post("http://localhost:4000/users/add/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, name: e.target.value });
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

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  const handleCover = (e) => {
    setNewUser({ ...newUser, cover: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="photo"
        onChange={handlePhoto}
      />

      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="cover"
        onChange={handleCover}
      />

      <input
        type="text"
        placeholder="first name"
        name="name"
        value={newUser.name}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="last name"
        name="lastname"
        value={newUser.lastname}
        onChange={handleLastNameChange}
      />

      <input
        type="text"
        placeholder="email"
        name="email"
        value={newUser.email}
        onChange={handleEmailChange}
      />

      <input
        type="text"
        placeholder="description"
        name="description"
        value={newUser.description}
        onChange={handleDescriptionChange}
      />

      <input
        type="date"
        name="birthdate"
        value={newUser.birthdate}
        onChange={handleDateChange}
      />

      <input type="submit" />
    </form>

    // <div className="testbox">
    //   <h1>Registration</h1>

    //   <form action="/">
    //     <hr />
    //     <div className="accounttype">
    //       <input
    //         type="radio"
    //         value="None"
    //         id="radioOne"
    //         name="account"
    //         checked
    //       />
    //       <label for="radioOne" className="radio" chec>
    //         Personal
    //       </label>
    //       <input type="radio" value="None" id="radioTwo" name="account" />
    //       <label for="radioTwo" className="radio">
    //         Company
    //       </label>
    //     </div>
    //     <hr />
    //     <label id="icon" for="name">
    //       <i className="icon-envelope "></i>
    //     </label>
    //     <input type="text" name="name" id="name" placeholder="Email" required />
    //     <label id="icon" for="name">
    //       <i className="icon-user"></i>
    //     </label>
    //     <input type="text" name="name" id="name" placeholder="Name" required />
    //     <label id="icon" for="name">
    //       <i className="icon-shield"></i>
    //     </label>
    //     <input
    //       type="password"
    //       name="name"
    //       id="name"
    //       placeholder="Password"
    //       required
    //     />
    //     <div className="gender">
    //       <input type="radio" value="None" id="male" name="gender" checked />
    //       <label for="male" className="radio" checked>
    //         Male
    //       </label>
    //       <input type="radio" value="None" id="female" name="gender" />
    //       <label for="female" className="radio">
    //         Female
    //       </label>
    //     </div>
    //     <p>
    //       By clicking Register, you agree on our{" "}
    //       <a href="#">terms and condition</a>.
    //     </p>
    //     <a href="#" className="button">
    //       Register
    //     </a>
    //   </form>
    // </div>
  );
};

export default User;
