import { Link } from "react-router";

const CropCard = ({ crop }) => {
  console.log("crop imgage url", crop.image);
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={crop.image}
          alt={crop.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{crop.name}</h2>
        <p>Type: {crop.type}</p>
        <p>
          Price: {crop.pricePerUnit} BDT / {crop.unit}
        </p>
        <p>Location: {crop.location}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <Link to={`/allCrops/${crop._id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
