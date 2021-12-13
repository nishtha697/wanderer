import React, {useEffect, useState} from "react";
import service from './service';
import {API_URL} from "../consts";
import {useNavigate} from "react-router-dom";
import Navigation from "../Nagivation";

const Providers = () => {
    const [provider, setProvider] = useState({username: ''});
        const onVerifiedChange = (event) =>
            setProvider({...provider, verified: true});
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            }).catch(e => navigate('/login'));
    }

    useEffect(getProfile, [navigate]);


    const [providers, setProviders] = useState([]);
    useEffect(() =>
        service.findAllProviders()
            .then(providers => setProviders(providers)),[]);

    // const updateVerification = () =>
    //     setProvider({verified: true});
    const saveVerification = () =>
        setProvider({...provider, verified: true});

        fetch(`${API_URL}/providers/${provider._id}`, {

            method: 'PUT',
            body: JSON.stringify(provider),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(providers => setProviders(providers));

if (user.role == "provider"){
        return (
            <div>
                <h1>Profile</h1>
                <input
                    value={"welcome " + user.role + " " + user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="form-control"/>

                <Navigation/>
                <button  onClick ={saveVerification} className="float-end">verify</button>

                <input className="form-control"
                       value={provider.verified}

                       onChange={onVerifiedChange}
                       style={{width: "70%"}}/>



                        {
                            providers.map(provider =>
                                <li key={provider._id}
                                    className="list-group-item">
                                    {provider.username}

                                    <button onClick={() =>   setProvider({...provider, verified: true})
                                    }
                                            className="btn btn-primary float-end ms-2">
                                        Edit

                                    </button>

                                </li>
                            )
                        }

            </div>
        )

    }else{
        return null;
    }
};

export default Providers;
