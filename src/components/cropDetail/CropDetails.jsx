import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaHandshake,
  FaInbox,
  FaUserTie,
} from "react-icons/fa";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const loadCrop = async () => {
      const res = await fetch(
        `https://krishi-link-api-server.vercel.app/products/${id}`
      );
      const data = await res.json();
      setCrop(data);
    };

    loadCrop();
  }, [id]);

  if (!crop) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center font-extrabold text-4xl py-3">Details</h1>
      <div className="grid md:grid-cols-2 gap-8 bg-base-300 text-base-content rounded-2xl shadow-xl overflow-hidden">
        {/* IMAGE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />

          <span className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">
            Fresh Crop
          </span>
        </motion.div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          <h1 className="text-4xl font-bold text-base-content">{crop.name}</h1>

          {/* DESCRIPTION */}
          <div className="flex items-start gap-2 text-base-content">
            <FaInfoCircle className="mt-1 text-green-600" />
            <p className="leading-relaxed">{crop.description}</p>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-base-content">
            <FaMapMarkerAlt className="text-green-600" />
            <span>{crop.location}</span>
          </div>
          {/* FARMER INFO */}
          <div className="flex items-center gap-3 text-base-content">
            <FaUserTie className="text-green-600 text-lg" />
            <span className="font-medium">
              Farmer:
              <span className="ml-1 font-semibold text-base-content">
                {crop.owner?.ownerName || "Unknown Farmer"}
              </span>
            </span>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-base-100 rounded-xl text-center">
              <p className="text-sm text-base-content">Price</p>
              <p className="text-xl font-bold text-green-600">
                {crop.pricePerUnit} / {crop.unit}
              </p>
            </div>

            <div className="p-4 bg-base-100 rounded-xl text-center">
              <p className="text-sm text-base-content">Available</p>
              <p className="text-xl font-bold">{crop.quantity} KG</p>
            </div>
          </div>

          {/* ACTION BUTTONS (FIXED LAYOUT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary flex items-center justify-center gap-2"
              onClick={() => navigate(`/crop/${id}/interest`)}
            >
              <FaHandshake />
              Send Interest
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline flex items-center justify-center gap-2"
              onClick={() => navigate(`/crop/${id}/received-interests`)}
            >
              <FaInbox />
              Received Interests
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CropDetails;
