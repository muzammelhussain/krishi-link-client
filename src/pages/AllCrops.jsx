import { useEffect, useState } from "react";
import CropCard from "../components/cropCard/CropCard";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCrops = async () => {
      setLoading(true); // start loading
      try {
        const res = await fetch(
          `https://krishi-link-api-server.vercel.app/products?search=${search}`
        );
        const data = await res.json();
        console.log("Crops API response:", data);
        setCrops(data);
      } catch (err) {
        console.error("Error fetching crops:", err);
        setCrops([]);
      } finally {
        setLoading(false); // stop loading
      }
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <span className="loading loading-spinner text-primary text-4xl"></span>
            <p className="mt-2 text-gray-500">Loading crops...</p>
          </div>
        ) : Array.isArray(crops) && crops.length > 0 ? (
          crops.map((crop) => <CropCard key={crop._id} crop={crop} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No crops found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCrops;
