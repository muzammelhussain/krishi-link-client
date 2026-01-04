import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUser, FaCommentDots, FaHashtag, FaLeaf } from "react-icons/fa";

const SendInterest = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`https://krishi-link-api-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => setCrop(data));
  }, [id]);

  if (!crop) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const totalPrice = quantity * crop.pricePerUnit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const interestData = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName || user.email,
      quantity,
      message,
      status: "pending",
    };

    try {
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
        Swal.fire({
          icon: "success",
          title: "Interest Sent",
          text: "Your interest has been sent successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        setSuccess(true);
        setQuantity(1);
        setMessage("");

        setTimeout(() => {
          navigate("/myInterest");
        }, 1500);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not Sent",
          text:
            data.message ||
            "Your interest could not be sent. You may have already applied.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6"
    >
      {/* PRODUCT PREVIEW */}
      <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl mb-6">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FaLeaf className="text-green-600" />
            {crop.name}
          </h3>
          <p className="text-sm text-gray-500">
            Farmer: {crop.owner?.ownerName || "Unknown"}
          </p>
          <p className="text-sm font-semibold text-green-600">
            {crop.pricePerUnit} / {crop.unit}
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Send Interest</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* QUANTITY */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaHashtag /> Quantity
              </span>
            </label>
            <input
              type="number"
              min="1"
              className="input input-bordered w-full"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaCommentDots /> Message (optional)
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Write a short message to farmer"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* TOTAL PRICE */}
          <div className="p-4 bg-base-200 rounded-xl text-center">
            <p className="text-sm text-gray-500">Estimated Total</p>
            <p className="text-2xl font-bold text-green-600">
              {isNaN(totalPrice) ? 0 : totalPrice} BDT
            </p>
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary w-full"
          >
            Submit Interest
          </motion.button>
        </form>
      </div>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-success mb-4 shadow"
        >
          <span>
            ✅ Your interest has been sent successfully! Redirecting...
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SendInterest;
