import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../NavBar/Navbar";
import UnVerifiedProvider from "./UnVerifiedProvider";

const PROVIDER_API = "http://localhost:4000/api/provider/unverified";

const AdminPanel = () => {
  let [unverifiedProviders, setUnverifiedProviders] = useState([]);

  useEffect(() => {
    fetch(PROVIDER_API)
      .then((res) => res.json())
      .then((providers) => setUnverifiedProviders(providers));
  });

  const validProviders = unverifiedProviders.filter(provider => provider.user_Id !== "")

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <h2>Pending Approvals</h2>
        <ul className="list-group">
          {validProviders.map((p) => <UnVerifiedProvider provider={p} />)}
        </ul>
      </div>
    </>
  );
};

export default AdminPanel;
