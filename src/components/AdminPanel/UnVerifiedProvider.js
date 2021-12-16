import React, {useEffect} from "react";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const USER_API = "http://localhost:4000/api/user"
const PROVIDER_API = "http://localhost:4000/api/provider";

const UnVerifiedProvider = ({provider}) => {

    let [user, setUser] = useState([]);

    debugger;
    useEffect(() => {
        fetch(`${USER_API}/${provider.user_Id}`)
            .then((res) => res.json())
            .then((provider) => setUser(provider));
    });

    const approveClickHandler = (provider) => {
        debugger;
        fetch(`${PROVIDER_API}/${provider._id}`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then(() => toast.success(`${user.name} is approved.`, {theme: "colored"}));

        // .then((user) => {
        //     setUnverifiedProviders(
        //         unverifiedProviders.filter((prov) => prov._id !== user._id)
        //     );
        // });
    };
    // unverifiedProviders.splice(unverifiedProviders.indexOf(p), 1)
    const rejectClickHandler = (provider) => {
        fetch(`${PROVIDER_API}/${provider._id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => toast.error(`${user.name} is deleted.`, {theme: "colored"}));
        // .then((user) => {
        //     setUnverifiedProviders(
        //         unverifiedProviders.filter((prov) => prov._id !== user._id)
        //     );
        // });
    };

    return (
        <li className="list-group-item">
            {" "}
            <div className="row">
                <div className="col-8">
                    <h6>{user.firstName} {user.lastName}</h6>
                    <p>
                        Address: {provider.address} <br/>
                        Phone: {provider.contact}<br/>
                        Card details: {provider.cardNumber}
                    </p>
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-success ms-2 me-2 float-end"
                        onClick={() => approveClickHandler(provider)}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-danger me-2 ms-2 float-end"
                        onClick={() => rejectClickHandler(provider)}
                    >
                        Reject
                    </button>
                </div>

            </div>
            <ToastContainer/>
        </li>
    )
}

export default UnVerifiedProvider;