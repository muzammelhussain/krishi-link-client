import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const CropDetails = () => {
  const { id } = useParams(); // cropId
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [alreadyInterested, setAlreadyInterested] = useState(false);

  // Load crop
  useEffect(() => {
    const loadCrop = async () => {
      const res = await fetch(
        `https://krishi-link-api-server.vercel.app/products/${id}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await res.json();
      setCrop(data);

      // Check already interested
      if (data?.interests?.some((i) => i.userEmail === user.email)) {
        setAlreadyInterested(true);
      }
    };
    loadCrop();
  }, [id, user.email]);

  if (!crop) return <p>Loading...</p>;

  const isOwner = crop.owner?.ownerEmail === user.email;
  const totalPrice = quantity * crop.pricePerUnit;

  // Submit Interest
  const handleInterest = async (e) => {
    e.preventDefault();

    if (quantity < 1)
      return Swal.fire("Error", "Quantity must be at least 1", "error");

    const interestData = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName || user.email,
      quantity,
      message,
      status: "pending",
    };

    const confirm = await Swal.fire({
      title: "Send Interest?",
      text: `Total Price: ${totalPrice} BDT`,
      showCancelButton: true,
      confirmButtonText: "Yes, Send",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      "https://krishi-link-api-server.vercel.app/interests",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(interestData),
      }
    );

    const data = await res.json();

    if (data.inserted) {
      Swal.fire("Success!", "Interest sent successfully!", "success");
      setAlreadyInterested(true);
    }
    navigate("/myInterest");
  };

  // OWNER: ACCEPT OR REJECT INTEREST

  const handleStatusChange = async (interestId, newStatus) => {
    console.log("button is clicked");
    const res = await fetch(
      `https://krishi-link-api-server.vercel.app/interests/status/${interestId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (data.modified) {
      Swal.fire("Updated!", "Interest status updated.", "success");

      // Update UI
      setCrop((prev) => ({
        ...prev,
        interests: prev.interests.map((i) =>
          i._id === interestId ? { ...i, status: newStatus } : i
        ),
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* CROP INFO */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Image */}
        <div className="relative">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-64 object-cover"
          />
          <span className="absolute bottom-3 right-3 bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow-lg">
            {crop.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800">{crop.name}</h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{crop.description}</p>

          <div className="divider"></div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p className="font-semibold">
              Price:
              <span className="block font-normal">
                {crop.pricePerUnit} / {crop.unit}
              </span>
            </p>

            <p className="font-semibold">
              Quantity:
              <span className="block font-normal">{crop.quantity}</span>
            </p>

            <p className="font-semibold">
              Location:
              <span className="block font-normal">{crop.location}</span>
            </p>

            <p className="font-semibold">
              Owner:
              <span className="block font-normal">{crop.owner.ownerName}</span>
            </p>
          </div>

          <div className="divider"></div>

          {/* Owner Section */}
          <div className="flex items-center gap-3">
            <img
              src={
                crop.owner.ownerImage ||
                "https://i.ibb.co.com/m5WJ86XJ/user.png"
              }
              className="w-12 h-12 rounded-full border"
            />

            <div>
              <h3 className="text-lg font-semibold">{crop.owner.ownerName}</h3>
              <p className="text-sm text-gray-500">{crop.owner.ownerEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* INTEREST FORM (BUYER ONLY) */}
      {!isOwner && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-3">Send Interest</h2>

          {alreadyInterested ? (
            <p className="text-red-500 font-semibold">
              You’ve already sent an interest for this crop.
            </p>
          ) : (
            <form onSubmit={handleInterest} className="space-y-3">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <p className="font-bold">
                Total Price: {isNaN(totalPrice) ? 0 : totalPrice} BDT
              </p>

              <button className="btn btn-primary w-full">
                Submit Interest
              </button>
            </form>
          )}
        </div>
      )}
      {/* RECEIVED INTERESTS (OWNER) */}

      {isOwner && (
        <div className="mt-10 bg-white p-6 shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Received Interests</h2>

          {crop.interests?.length === 0 ? (
            <p className="text-gray-500">No interests received yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {crop.interests?.map((interest) => (
                    <tr key={interest._id}>
                      <td>{interest.userName}</td>
                      <td>{interest.quantity}</td>
                      <td>{interest.message}</td>
                      <td>
                        <span
                          className={`badge ${
                            interest.status === "pending"
                              ? "badge-warning"
                              : interest.status === "accepted"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {interest.status}
                        </span>
                      </td>

                      <td className="space-x-2">
                        <button
                          className="btn btn-success btn-sm"
                          disabled={interest.status !== "pending"}
                          onClick={() =>
                            handleStatusChange(interest._id, "accepted")
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-error btn-sm"
                          disabled={interest.status !== "pending"}
                          onClick={() =>
                            handleStatusChange(interest._id, "rejected")
                          }
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
      )}
    </div>
  );
};

export default CropDetails;
