import { useEffect, useState } from "react";
import CropCard from "../components/cropCard/CropCard";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadCrops = async () => {
      const res = await fetch(
        `http://localhost:3000/products?search=${search}`
      );
      const data = await res.json();

      console.log("Crops API response:", data);

      setCrops(data);
    };

    loadCrops();
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search crops..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(crops) && crops.length > 0 ? (
          crops.map((crop) => <CropCard key={crop._id} crop={crop} />)
        ) : (
          <p>No crops found.</p>
        )}
      </div>
    </div>
  );
};

export default AllCrops;
