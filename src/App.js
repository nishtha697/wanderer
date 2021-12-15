import "./App.css";
import "./vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";
// import "./vendors/bootstrap/bootstrap.min.css";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/ProfileScreen/Profile.js";
import posts from "./reducers/posts";
import user from "./reducers/user";
import SuperMap from "./components/Maps/SuperMap/SuperMap";
import MyMap from "./components/Maps/MyMap/MyMap";
import Navbar from "./components/NavBar/Navbar";
import SearchComponent from "./components/SearchComponent";
import User from "./components/User";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Privacy from "./components/Privacy";
import HomeScreen from "./components/HomeScreen";

const reducer = combineReducers({posts, user});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" exact={true} element={<AdminPanel/>} />
                <Route path="/user" exact={true} element={<User/>} />


                <Route path="/privacy" exact={true} element={<Privacy/>} />

                <Route name="search" path="/search/:result" element={<SearchComponent/>} />

                <Route path="/profile" exact={true} element={<Profile/>} />

                <Route path="/profile/:id" element={<Profile/>} />

                <Route path="/super" exact={true} element={<SuperMap/>} />

                <Route path="/mymap" exact={true} element={<MyMap/>} />

                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;