import './App.css';
import './vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
//import "./vendors/bootstrap/bootstrap.min.css";

import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./components/Profile.js";

function App() {
  return (
    <BrowserRouter>
      <Route path={["/", "/profile"]} exact={true}>
        <Profile/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
