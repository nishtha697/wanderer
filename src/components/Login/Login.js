import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_URL} from "./consts";
import Privacy from "../Privacy/Privacy"

// import Navigation from "../Nagivation";
import Carousel from "../Caurosel/Caurosel"
import Plane from "../Images/plane.jpg"

const Login = () => {

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const login = () => {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(status => {
      navigate('/profile')
    });
  }

  return(
<div>

    <div>
        {/*<Privacy/>*/}
        <div className="container mt-5">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Log in
            </button>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Log in</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <input
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    placeholder="email"
                                    className="form-control"/>
                                <input
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    placeholder="password"
                                    type="password"
                                    className="form-control mt-1"/>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                className=" btn btn-primary mt-1"
                                onClick={login}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div className = "">
        <div
            className="nav justify-content-center shadow ps-5 pe-5 pb-5 pt-5 ">
                <div>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email"
                        className="form-control"/>
                    <input
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                        type="password"
                        className="form-control mt-1"/>

                    <button
                        className=" btn btn-primary mt-1"
                        onClick={login}>
                        Login
                    </button>
                </div>
            <ul className="nav navbar d-inline-flex justify-content-center">
            </ul>
        </div>




    </div>
    </div>
  );
};
export default Login;