import { Link } from "react-router";
import { FaLeaf, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

const CropCard = ({ crop }) => {
  return (
    <div className="bg-base-300 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-72  mx-auto">
      {/* Image */}
      <figure className="overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-48 object-cover"
        />
      </figure>

      {/* Body */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-base-content ">
          {crop.name}
        </h2>

        <div className="mt-3 space-y-2 text-base-content  text-sm">
          <p className="flex items-center justify-center gap-2">
            <FaLeaf className="text-green-500" /> {crop.type}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaMoneyBillWave className="text-yellow-500" /> {crop.pricePerUnit}{" "}
            BDT / {crop.unit}
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> {crop.location}
          </p>
        </div>

        {/* Details button */}
        <Link
          to={`/allCrops/${crop._id}`}
          className="mt-4 inline-block bg-green-400 text-white py-1 px-4 rounded-sm hover:bg-blue-600 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CropCard;
