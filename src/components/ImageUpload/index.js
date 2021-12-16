import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { useState } from "react/cjs/react.development";

const API_URL = "http://localhost:4000";

let [multerImg, setMulterImg] = useState(null);

const uploadImg = (e) => {
  let imageObj = {};

  let imageFormObj = new FormData();

  imageFormObj.append("imageName", "multer-image-" + Date.now());
  imageFormObj.append("imageData", e.target.files[0]);

  setMulterImg(URL.createObjectURL(e.target.files[0]));

  axios
    .post(`${API_URL}/image/uploadmulter`, imageFormObj)
    .then((data) => {
      if (data.data.success) {
        alert("Image has been successfully uploaded using multer");
        this.setDefaultImage("multer");
      }
    })
    .catch((err) => {
      alert("Error while uploading image using multer");
      this.setDefaultImage("multer");
    });
  return (
    <div className="main-container">
      <h3 className="main-heading">Image Upload App</h3>
      <div className="image-container">
        <div className="process">
          <h4 className="process__heading">Process: Using Multer</h4>
          <p className="process__details">
            Upload image to a node server, connected to a MongoDB database, with
            the help of multer
          </p>

          <input
            type="file"
            className="process__upload-btn"
            onChange={(e) => this.uploadImage(e, "multer")}
          />
          <img
            src={this.state.multerImage}
            alt="upload-image"
            className="process__image"
          />
        </div>
      </div>
    </div>
  );
};
