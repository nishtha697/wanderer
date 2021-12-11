import React from "react";
import travel from './travel.jpeg'
import Caurosel from "./Caurosel";
import Login from "./Login";
import Navbar from "./Navbar"
import T from "./T";
import Pins from "./Pins";
import Ipad from "./ipad.png"


const Body = () => {
    return(

            <div className="">
                <Navbar/>

                <div className = "row mt-5">
                    <div className = "col-2">
                    </div>
                    <div className="col-8 ">

                            <Caurosel/>

                        <Login/>


                    </div>
                    <div className="col-2">
                    </div>
                </div>

                <div className = "row mt-5">
                    <div className = "ms-3 col-2 mt-5 ms-5">
                        <div>
                            <h5>Travel is good.</h5>

                            <p>Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                            </p>
                            <button>Travel</button>
                        </div>


                    </div>
                    <div className="col-8 mt-5">
                        <img
                            src={Ipad}
                            width = "500"
                        />

                    </div>
                    <div className="col-3">
                    </div>
                </div>
                <div className = "row mt-5">
                    <div className = "col-2 ">

                    </div>
                    <div className="col-7 ">

                    </div>
                    <div className="col-2 mt-5">
                        <Pins/>
                    </div>

                </div>
                <div className = "row mt-5">
                    <div className = "ms-5 col-2 mt-5">
                        <div>
                            <h5>d.</h5>

                            <p>Mapbox provides powerful routing engines, accurate, traffic-powered travel times, and intuitive turn-by-turn directions to help you build engaging navigation experiences.
                            </p>
                            <button>Travel</button>
                        </div>
                    </div>
                </div>

            </div>










    )
}

export default Body;