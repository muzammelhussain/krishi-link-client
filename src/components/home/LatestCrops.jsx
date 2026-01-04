import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import CropCard from "../cropCard/CropCard";

const LatestCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch(
          "https://krishi-link-api-server.vercel.app/products"
        );
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error("Error fetching crops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div className="bg-base-100 max-w-7xl mx-auto  ">
      <section className="p-6  ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Latest Crops</h2>
          <Link to="/allCrops" className="btn btn-sm bg-green-400">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {crops.length > 0 ? (
              crops.map((crop, index) => (
                <div
                  key={crop._id}
                  className="animate-fadeIn transform transition duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CropCard crop={crop} />
                </div>
              ))
            ) : (
              <p>No crops found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default LatestCrops;
