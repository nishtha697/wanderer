import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_URL} from "../consts";
// import Navigation from "../Nagivation";
import Navbar from "../components/Navbar"

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
      <h1>Login</h1>
      <input
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="username"
        className="form-control"/>
      <input
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        type="password"
        className="form-control"/>
      <button
        className="btn btn-primary"
        onClick={login}>
        Login
      </button>
      {/*<Navigation/>*/}
    </div>
  );
};
export default Login;