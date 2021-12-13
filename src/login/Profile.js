import {useEffect, useState} from "react";
import {API_URL} from "../consts";
import {useNavigate} from "react-router-dom";
import Navigation from "../Nagivation";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getProfile = () => {
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
      .then(user => {
        setUser(user);
    }).catch(e => navigate('/login'));
  }
  const logout = () => {
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => navigate('/'));
  }
  useEffect(getProfile, [navigate]);
  return(
    <div>
      <h1>Profile</h1>
      <input
        value={"welcome " + user.role + " " + user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="username"
        className="form-control"/>
        <button
          onClick={logout}
          className="btn btn-danger">
          Logout
        </button>
      <Navigation/>
    </div>


  );
};
export default Profile;