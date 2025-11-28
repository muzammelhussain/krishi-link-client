import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [sortType, setSortType] = useState(""); // NEW

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-interests/${user.email}`)
      .then((res) => res.json())
      .then((data) => setInterests(data));
  }, [user]);

  // ------------------------------
  // SORTING FUNCTION
  // ------------------------------
  const sortedInterests = [...interests].sort((a, b) => {
    if (sortType === "name") {
      return a.cropName.localeCompare(b.cropName);
    }
    if (sortType === "owner") {
      return a.ownerName.localeCompare(b.ownerName);
    }
    if (sortType === "quantity") {
      return a.quantity - b.quantity;
    }
    if (sortType === "status") {
      const order = { pending: 1, accepted: 2, rejected: 3 };
      return order[a.status] - order[b.status];
    }

    return 0; // default (no sorting)
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Interests</h1>

      {/* SORT DROPDOWN */}
      <div className="flex justify-end mb-4">
        <select
          className="select select-bordered"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Crop Name (A-Z)</option>
          <option value="owner">Owner Name (A-Z)</option>
          <option value="quantity">Quantity (Low → High)</option>
          <option value="status">Status (Pending → Accepted → Rejected)</option>
        </select>
      </div>

      {sortedInterests.length === 0 ? (
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
              {sortedInterests.map((item, i) => (
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
