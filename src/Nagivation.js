import {Link} from "react-router-dom";

const Navigation = () => {
  return(
    <div className="list-group">
      <Link to="/" className="list-group-item">
        Home
      </Link>
      <Link to="/register" className="list-group-item">
        Register

      </Link>
      <Link to="/login" className="list-group-item">
        Login
      </Link>
        <Link to="/privacy" className="list-group-item">
            Login
        </Link>
      <Link to="/profile" className="list-group-item">
        Profile
      </Link>
        <Link to="/verifications" className="list-group-item">
            Verification
        </Link>
    </div>
  );
};
export default Navigation;