import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const CropDetails = () => {
  const { id } = useParams(); // cropId
  const { user } = use(AuthContext);

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [alreadyInterested, setAlreadyInterested] = useState(false);

  // Load crop
  useEffect(() => {
    const loadCrop = async () => {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setCrop(data);

      // Check if user already interested
      if (data?.interests?.some((i) => i.userEmail === user.email)) {
        setAlreadyInterested(true);
      }
    };
    loadCrop();
  }, [id, user.email]);

  if (!crop) return <p>Loading...</p>;

  const isOwner = crop.owner?.ownerEmail === user.email;
  const totalPrice = quantity * crop.pricePerUnit;

  // Submit interest
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
      text: `Total Price: ${totalPrice}`,
      showCancelButton: true,
      confirmButtonText: "Yes, Send",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch("http://localhost:3000/interests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(interestData),
    });

    const data = await res.json();

    if (data.inserted) {
      Swal.fire("Success!", "Interest sent successfully!", "success");
      setAlreadyInterested(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* CROP INFO */}
      <div className="card bg-white p-6 shadow-xl">
        <img src={crop.image} className="w-full rounded-lg mb-5" alt="" />

        <h1 className="text-3xl font-bold">{crop.name}</h1>
        <p className="text-lg text-gray-600">{crop.type}</p>
        <p className="mt-3">{crop.description}</p>

        <div className="mt-5 space-y-1">
          <p>
            <strong>Price per unit:</strong> {crop.pricePerUnit} / {crop.unit}
          </p>
          <p>
            <strong>Available Quantity:</strong> {crop.quantity}
          </p>
          <p>
            <strong>Location:</strong> {crop.location}
          </p>
          <p>
            <strong>Owner:</strong> {crop.owner.ownerName}
          </p>
        </div>
      </div>

      {/* INTEREST FORM (only for non-owner users) */}
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
    </div>
  );
};

export default CropDetails;
