import React, {useEffect, useState} from "react";
import "./index.css";
import ReactMapGL, {Marker} from "react-map-gl";
import Navbar from "../NavBar/Navbar";
import {useDispatch} from "react-redux";
const POST_API = 'http://localhost:4000/api/posts';

const HomeScreen = () => {
    //******** Code to get the current logged in user */
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [user]);

    const [viewport, setViewport] = useState({
                                                 width: "100%",
                                                 height: "45vh",
                                                 latitude: 42.95,
                                                 longitude: -74.23,
                                                 zoom: 12,
                                             });
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch(POST_API)
            .then(response => response.json())
            .then(posts => {
                setPosts(posts)
                dispatch({
                             type: 'fetch-all-posts',
                             posts
                         }
                )
                debugger;
                if (localStorage.getItem("user") !== null) {
                    console.log(localStorage.getItem("user"));
                    console.log(JSON.parse(localStorage.getItem("user"))._id);
                    const userPosts = posts.filter((post) => post.user_Id === JSON.parse(localStorage.getItem("user"))._id);
                    setPosts(userPosts)
                    setViewport({
                                    width: "100%",
                                    height: "45vh",
                                    latitude: userPosts.length !== 0 ? userPosts[0].latitude : 42.95,
                                    longitude: userPosts.length !== 0 ? userPosts[0].longitude : -74.23,
                                    zoom: 12,
                                });
                } else {
                    setViewport({
                                    width: "100%",
                                    height: "45vh",
                                    latitude: posts[0].latitude,
                                    longitude: posts[0].longitude,
                                    zoom: 12,
                                });
                }

            })
    }, [localStorage.getItem("user")]);



    const recentPosts = posts.slice(0, 3);

    return (
        <>
            <Navbar/>
            <ReactMapGL
                mapboxApiAccessToken="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                transitionDuration="10"
            >
                {recentPosts.map((post) => {
                    return (<Marker
                        latitude={post.latitude}
                        longitude={post.longitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <i
                            className="fas fa-map-marker-alt"
                            style={{
                                fontSize: 2 * viewport.zoom,
                                color: "orangered",
                                cursor: "pointer",
                            }}
                        />
                    </Marker>) })}
            </ReactMapGL>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="/images/connect.jpg" className="connect"/>
                        <h2>Connect</h2>
                        <p>
                            Want to share some of your best moments with everyone out there?
                            Wandered lets you do that with just a click. Share places that you
                            have visited and let others get a feel of the place...
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img src="/images/location.jpg" className="connect"/>
                        <h2>Experience</h2>
                        <p>
                            With Wanderer, you can explore places which you have never visited
                            before. It can help you get reviews of any place anywhere in the
                            world.
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img src="/images/service-provider.jpg" className="connect"/>
                        <h2>Business</h2>
                        <p>
                            Want to grow your business? Join us on Wanderer where you can
                            register as a service provider and expand your business. With a
                            very simplistic yet modern user interface, you get all the
                            functionalities you may require to grow your market.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeScreen;
