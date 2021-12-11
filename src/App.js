import './App.css';
import './vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./components/ProfileScreen/Profile.js";
import posts from "./reducers/posts";
import user from "./reducers/user";
import SuperMap from "./components/Maps/SuperMap/SuperMap";
import MyMap from "./components/Maps/MyMap/MyMap";
import "./index.css";

const reducer = combineReducers({posts, user})

const store = createStore(reducer,
                          window.__REDUX_DEVTOOLS_EXTENSION__
                          && window.__REDUX_DEVTOOLS_EXTENSION__());

import Login from "./login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Register from "./login/Register";
import Profile from "./login/Profile";
import Verifications from "./Providers/index"
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verifications" element={<Verifications/>}/>
                <Route path={["/profile"]} exact={true}>
                    <Profile/>
                </Route>
                <Route path={["/profile/:id"]}>
                    <Profile/>
                </Route>
                <Route path={["/super"]} exact={true}>
                    <SuperMap />
                </Route>
                <Route path={["/mymap"]} exact={true}>
                    <MyMap />
                </Route>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
