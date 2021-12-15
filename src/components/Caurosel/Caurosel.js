import React from "react";
import travel from "../Images/travel.jpg"
import plane from "../Images/plane.jpg"

const Caurosel = () => {

    return(


        <div
            id="carouselExampleCaptions"
            className="carousel slide"


            data-bs-interval="2000"
            data-bs-ride="carousel"
        >

            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-lael="slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-current="true"
                    aria-lael="slide 2"
                ></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src={plane}
                        className="d-block w-100 rounded"
                        width = "100"
                        height = "300"
                        alt="plane 1"
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First Slide</h5>
                        <p>this is the first slide</p>
                    </div>

                </div>
                <div className="carousel-item">
                    <img
                        src={travel}
                        className="rounded d-block w-100 rounded"
                        width = "100"
                        height = "300"
                        alt="travel"
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second Slide</h5>
                        <p>this is the second slide</p>
                    </div>

                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>



    )
}

export default Caurosel;