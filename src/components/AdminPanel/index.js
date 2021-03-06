import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import UnVerifiedProvider from "./UnVerifiedProvider";

const PROVIDER_API = "http://18.222.87.70:4000/api/provider/unverified";

const AdminPanel = () => {
  let [unverifiedProviders, setUnverifiedProviders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
    if (
      JSON.parse(localStorage.getItem("user")) === null ||
      JSON.parse(localStorage.getItem("user")).role !== "admin"
    ) {
      history.push("/");
    }

    fetch(PROVIDER_API)
      .then((res) => res.json())
      .then((providers) => setUnverifiedProviders(providers));
  }, []);

  const validProviders = unverifiedProviders && unverifiedProviders.filter(
    (provider) => provider.user_Id !== ""
  );

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <h2>Pending Approvals</h2>
        <ul className="list-group">
          {validProviders && validProviders.map((p) => (
            <UnVerifiedProvider provider={p} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminPanel;
