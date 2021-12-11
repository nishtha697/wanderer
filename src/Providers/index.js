import React, {useEffect, useState} from "react";
import service from './service';
import {API_URL} from "../consts";
import {useNavigate} from "react-router-dom";
import Navigation from "../Nagivation";

const Providers = () => {
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
            .then(providers => setProviders(providers)));

    const [provider, setProvider] = useState({verified: false});


    const updateVerification = () =>
        setProvider({verified: true});

    const saveVerification = () =>
        updateVerification
        service.updateVerification(provider)
            .then(() => setProviders(
                providers.map(m => m._id === provider._id ? provider : m)
            ));

    if (user.kind == "admin"){
        return (
            <div>
                <h1>Profile</h1>
                <input
                    value={"welcome " + user.kind + " " + user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="form-control"/>

                <Navigation/>
                <div>
                    <h2>providers</h2>
                    <ul className="list-group">
                        {

                            providers.map(provider =>

                                <li key={provider._id}
                                    className="list-group-item">
                                    {provider.username}

                                    <button onClick={saveVerification} className="float-end">verify</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }else{
        return null;
    }
};

export default Providers;
