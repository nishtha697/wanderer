import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_URL} from "../consts";
import Navigation from "../Nagivation";

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
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
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
      <Navigation/>
    </div>
  );
};
export default Login;