import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import CropCard from "../cropCard/CropCard";

const LatestCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch("http://localhost:3000/products?limit=6");
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Latest Crops</h2>
        <Link to="/allCrops" className="btn btn-primary">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.length > 0 ? (
          crops.map((crop) => <CropCard key={crop._id} crop={crop} />)
        ) : (
          <p>No crops found.</p>
        )}
      </div>
    </section>
  );
};

export default LatestCrops;
