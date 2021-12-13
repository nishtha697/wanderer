import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_URL} from "../consts";
import Navigation from "../Nagivation";



const Register = () => {
    let userType = "";
    const [user, setUser] = useState({email: 'alice', password: 'alice123'});

    const navigate = useNavigate();


    const register = () => {
        if(document.getElementById('user').checked) {
            userType = "register"
            user.role = "user";


        }else if(document.getElementById('provider').checked) {
            userType = "register2"
            user.verified = false;
            user.role = "provider";
        }

        fetch(`${API_URL}/${userType}`, {

            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => navigate('/profile'));
    };


    const hide = () => {
        const special = document.getElementsByClassName("special")
        console.log(special)
        for(let i = 0, length = special.length; i < length; i++) {
            special[i].hidden = true;
        }}
    const show = () => {
        const special = document.getElementsByClassName("special")
        for(let i = 0, length = special.length; i < length; i++) {
            special[i].hidden = false;
        }}

    return(
        <div>

            <h1>Register</h1>
            User: <input type="radio" name="chooseOne" id="user" value="user" onClick ={hide} ></input>
            Provider: <input type="radio" name="chooseOne" id="provider" value="provider"  onClick ={show}  />
            <input
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="username"
                className="form-control"/>
            <input
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                type="password"
                className="form-control"/>
            <input
                onChange={(e) => setUser({...user, verifyPassword: e.target.value})}
                placeholder="verify password"
                type="password"
                className="form-control"/>

            <input
                value={user.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                placeholder="firstName"
                type="firstName"
                className="form-control"/>
            <input
                value={user.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                placeholder="lastName"
                type="lastName"
                className="form-control"/>

            <input
                value={user.DOB}
                onChange={(e) => setUser({...user, DOB: e.target.value})}
                placeholder="DOB"
                type="DOB"
                className="form-control"/>
            <input
                value={user.address}
                onChange={(e) => setUser({...user, address: e.target.value})}
                placeholder="address"
                type="address"
                className="form-control"/>
            <input
                value={user.city}
                onChange={(e) => setUser({...user, city: e.target.value})}
                placeholder="city"
                type="city"
                className="form-control"/>
            <input
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                placeholder="phone"
                type="phone"
                className="form-control"/>

            <input className = "form-control special" id = "special"
                value={user.creditCard}

                onChange={(e) => setUser({...user, creditCard: e.target.value})}
                placeholder="creditCard"
                type="creditCard"
                />

            <input  id = "special"
               value={user.description}

               onChange={(e) => setUser({...user, description: e.target.value})}
               placeholder="description"
               type="description"
               className="form-control special"/>


            <button
                className="btn btn-primary"
                onClick={register}>
                Register
            </button>
            <Navigation/>
        </div>
    );
};
export default Register;