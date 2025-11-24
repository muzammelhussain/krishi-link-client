import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyInterest = () => {
  const { user } = use(AuthContext);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/my-interests/${user.email}`)
      .then((res) => res.json())
      .then((data) => setInterests(data));
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Interests</h1>

      {interests.length === 0 ? (
        <p className="text-center text-gray-500">No interests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>Crop Name</th>
                <th>Owner</th>
                <th>Quantity</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {interests.map((item, i) => (
                <tr key={i} className="hover">
                  <td>{item.cropName}</td>
                  <td>
                    {item.ownerName}
                    <br />
                    <span className="text-sm text-gray-500">
                      {item.ownerEmail}
                    </span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.message}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "pending"
                          ? "badge-warning"
                          : item.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterest;
