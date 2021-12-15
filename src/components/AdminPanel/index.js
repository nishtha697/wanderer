import React, { useEffect } from "react";
import { useState } from "react";

const USER_API = "http://localhost:4000/api/provider";

const AdminPanel = () => {
  let [unverifiedProviders, setUnverifiedProviders] = useState([]);

  useEffect(() => {
    fetch(USER_API)
      .then((res) => res.json())
      .then((providers) => setUnverifiedProviders(providers));
  });

  const approveClickHandler = (p) => {
    fetch(`${USER_API}/${p._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((p) => {
        setUnverifiedProviders(
          unverifiedProviders.filter((prov) => prov._id !== p._id)
        );
      });
  };
  // unverifiedProviders.splice(unverifiedProviders.indexOf(p), 1)
  const rejectClickHandler = (p) => {
    fetch(`${USER_API}/${p._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((p) => {
        setUnverifiedProviders(
          unverifiedProviders.filter((prov) => prov._id !== p._id)
        );
      });
  };

  return (
    <div>
      <ul>
        {unverifiedProviders.map((p) => (
          <li>
            {" "}
            {p.first_name} {p.last_name}{" "}
            <button
              className="btn btn-success float-end"
              onClick={() => approveClickHandler(p)}
            >
              Approve
            </button>
            <button
              className="btn btn-danger float-end"
              onClick={() => rejectClickHandler(p)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
