import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { FaLock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ReceivedInterests = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    fetch(`https://krishi-link-api-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => setCrop(data));
  }, [id]);

  if (!crop)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading interests...
        </p>
      </div>
    );

  if (crop.owner?.ownerEmail !== user.email) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-center p-6">
        <FaLock className="text-6xl text-red-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-600">
          Oops! You are not authorized to view the interests for this crop.
          <br />
          Please make sure you are logged in with the correct account.
        </p>
      </div>
    );
  }

  const handleStatusChange = async (interestId, status) => {
    await fetch(
      `https://krishi-link-api-server.vercel.app/interests/status/${interestId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    Swal.fire("Updated!", `Interest has been ${status}.`, "success");

    setCrop((prev) => ({
      ...prev,
      interests: prev.interests.map((i) =>
        i._id === interestId ? { ...i, status } : i
      ),
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        Received Interests
      </h2>

      {crop.interests?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
          <FaTimesCircle className="text-5xl mb-3" />
          <p>No one has shown interest in your crop yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th>Buyer</th>
                <th>Quantity</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {crop.interests.map((i) => (
                <tr key={i._id} className="hover:bg-green-50 transition-all">
                  <td className="font-medium">{i.userName}</td>
                  <td>{i.quantity}</td>
                  <td>{i.message}</td>
                  <td>
                    {i.status === "accepted" ? (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <FaCheckCircle /> Accepted
                      </span>
                    ) : i.status === "rejected" ? (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <FaTimesCircle /> Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-success btn-sm"
                      disabled={i.status !== "pending"}
                      onClick={() => handleStatusChange(i._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      disabled={i.status !== "pending"}
                      onClick={() => handleStatusChange(i._id, "rejected")}
                    >
                      Reject
                    </button>
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

export default ReceivedInterests;
