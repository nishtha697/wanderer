import "./App.css";
import "./vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";
// import "./vendors/bootstrap/bootstrap.min.css";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./components/ProfileScreen/Profile.js";
import posts from "./reducers/posts";
import user from "./reducers/user";
import SuperMap from "./components/Map/SuperMap/SuperMap";
import MyMap from "./components/Map/MyMap/MyMap";
import Navbar from "./components/NavBar/Navbar";
import SearchComponent from "./components/SearchComponent";
import User from "./components/User";
import AdminPanel from "./components/AdminPanel";

const reducer = combineReducers({ posts, user });

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path={["/profile"]} exact={true}>
          <Profile />
        </Route>

        <Route path="/" exact={true}>
          <Navbar />
        </Route>

        <Route path="/admin" exact={true}>
          <AdminPanel />
        </Route>

        <Route path="/user" exact={true}>
          <User />
        </Route>

        <Route name="search" path={["/search/:result"]}>
          <SearchComponent />
        </Route>

        <Route path={["/super"]} exact={true}>
          <SuperMap />
        </Route>
        <Route path={["/mymap"]} exact={true}>
          <MyMap />
        </Route>
      </BrowserRouter>
    </Provider>
    // <User />
  );
}

export default App;
