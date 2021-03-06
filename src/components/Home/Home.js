import Navigation from "../../Nagivation";
import Caurosel from "../Caurosel/Caurosel";
import travel from "../Images/travel.jpeg";
import React from "react";
// import Login from "./components/Login";
// import Navbar from "./Navbar"
// import T from "./T";
// import Pins from "./Pins";
import ipad from "../Images/ipad.png"
import map2 from "../Images/map2.jpg"
import pins from "../Images/pins.jpg"
import Privacy from "../Privacy/Privacy";
// import Encrypt from "../Encryption/Encrypt";

const Home = () => {
  return(

    <div>
        {/*<Encrypt/>*/}

        <Navigation/>
        <Privacy/>
        <div className="">

            <div className = "row mt-5">
                <div className = "col-2">
                </div>
                <div className="col-8 ">

                    <Caurosel/>


                </div>
                <div className="col-2">
                </div>
            </div>
{/*ROW 1*/}

            <div className = "row mt-5 ">
                <div className = "ms-3 col-md-3 mt-5 col-sm-0 d-none d-md-block">
                    <div>
                        <h5>Travel is good.</h5>

                        <p>Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                        </p>
                        <button className= "btn btn-primary">Travel</button>
                    </div>
                </div>
                <div className="col-md-8 mt-5 col-sm-12">
                    <img
                        src={pins}
                        className = "rounded"
                        width = "500"
                    />                </div>
                <div className="col-md-1">
                </div>
            </div>

            <div className = "d-md-none ">
                <h5>Travel is good.</h5>

                <p className="">Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                </p>
                <button className= "fa-2x btn btn-primary">Travel</button>
            </div>






            {/*ROW 2*/}
            <div className = "row mt-5">
                <div className = "col-xl-4 col-md-0 col-m-0">

                </div>
                <div className="col-xl-5 col-md-8 col-sm-12">
                    <img
                        src={map2}
                        className= "rounded"

                        width = "500"
                    />
                </div>
                <div className="col-xl-3 col-md-4">


                        <h5 className= "ms-5" >Place your pins.</h5>

                        <p className= "ms-5">Our APIs, SDKs, and live updating map data give developers tools to build better mapping, navigation, and search experiences across platforms.

                        </p>
                        <button className= "btn btn-primary ms-5 d-none d-md-block ">Place</button>
                    <button className= "btn btn-primary ms-5  fa-2x d-md-none">Place</button>


                    </div>
                {/*ROW 2*/}
            </div>

            <div className = "row mt-5 ">
                <div className = "ms-3 col-md-3 mt-5 col-sm-0 d-none d-md-block">
                    <div>
                        <h5>Travel is good.</h5>

                        <p>Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                        </p>
                        <button className= "btn btn-primary">Travel</button>
                    </div>
                </div>
                <div className="col-md-8 mt-5 col-sm-12">
                    <img
                        src={pins}
                        className = "rounded"

                        width = "500"
                    />                </div>
                <div className="col-md-4">
                </div>
            </div>

            <div className = "d-md-none ">
                <h5>Travel is good.</h5>

                <p className="">Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                </p>
                <button className= "btn btn-primary fa-2x">Travel</button>
            </div>
        </div>

    </div>
  );
};
export default Home;