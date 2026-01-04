import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router"; // Use useNavigate from 'react-router-dom'
import Swal from "sweetalert2";
import { FaSeedling, FaTag, FaBalanceScale, FaMapMarkerAlt, FaFeatherAlt } from 'react-icons/fa'; // Importing icons for field labels

const AddCrops = () => {
  // Fix: use(AuthContext) should be useContext(AuthContext)
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Utility component for form field with icon
  const FormField = ({ label, icon, children }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold text-gray-700 flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </span>
      </label>
      {children}
    </div>
  );

  const handleAddCrop = (e) => {
    e.preventDefault();

    const form = e.target;

    const newCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseFloat(form.price.value),
      unit: form.unit.value,
      quantity: parseFloat(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
      createdAt: new Date(),

      // Auto assign logged-in user info
      owner: {
        ownerId: user.uid,
        ownerName: user.displayName,
        ownerEmail: user.email,
        ownerImage: user.photoURL,
      },
    };

    fetch("https://krishi-link-api-server.vercel.app/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCrop),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Crop added successfully!",
          icon: "success",
          confirmButtonText: "Go to My Posts",
        }).then(() => {
          // Navigate to a specific dashboard sub-route if needed, e.g., '/dashboard/myPost'
          navigate("/dashboard/myPost"); 
        });
      })
      .catch((err) => {
        console.error("Error adding crop:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to add crop. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    // Unique Background and Shadow
    <div className="min-h-screen bg-green-50/70 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-2xl rounded-xl border border-green-200">
        
        {/* Header with theme color */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-green-700 border-b-4 border-green-500 pb-3">
          🌾 List Your Harvest
        </h1>

        <form onSubmit={handleAddCrop} className="space-y-6">
          
          {/* --- SECTION 1: CROP DETAILS --- */}
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50/70 shadow-inner">
            <h2 className="text-xl font-bold mb-4 text-green-600 flex items-center">
              <FaSeedling className="mr-2" />
              Crop Identification
            </h2>
            
            {/* Name */}
            <FormField label="Crop Name" icon={<FaSeedling />}>
              <input 
                name="name" 
                className="input input-bordered w-full focus:ring-green-500 focus:border-green-500" 
                placeholder="e.g., Organic Red Tomatoes"
                required 
              />
            </FormField>

            {/* Type */}
            <FormField label="Crop Type" icon={<FaSeedling />}>
              <select
                name="type"
                className="select select-bordered w-full bg-white focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="" disabled>Select a category</option>
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Grain</option>
                <option>Spice</option>
                <option>Other</option>
              </select>
            </FormField>
          </div>

          {/* --- SECTION 2: PRICING & QUANTITY --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border border-gray-200 rounded-lg bg-gray-50/70 shadow-inner">
            <h2 className="md:col-span-3 text-xl font-bold mb-4 text-green-600 flex items-center border-b pb-2">
              <FaTag className="mr-2" />
              Pricing and Stock
            </h2>
            
            {/* Price per Unit */}
            <FormField label="Price per Unit" icon={<FaTag />}>
              <input
                name="price"
                type="number"
                step="0.01" // Allows decimal input
                placeholder="e.g., 50.00"
                className="input input-bordered w-full focus:ring-green-500 focus:border-green-500"
                required
              />
            </FormField>

            {/* Unit */}
            <FormField label="Unit of Sale" icon={<FaBalanceScale />}>
              <select
                name="unit"
                className="select select-bordered w-full bg-white focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="" disabled>Select unit</option>
                <option>kg</option>
                <option>quintal</option>
                <option>ton</option>
                <option>bag</option>
                <option>piece</option>
              </select>
            </FormField>

            {/* Quantity */}
            <FormField label="Quantity Available" icon={<FaBalanceScale />}>
              <input
                name="quantity"
                type="number"
                placeholder="e.g., 500"
                className="input input-bordered w-full focus:ring-green-500 focus:border-green-500"
                required
              />
            </FormField>
          </div>

          {/* --- SECTION 3: LOCATION & MEDIA --- */}
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50/70 shadow-inner space-y-4">
            <h2 className="text-xl font-bold text-green-600 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Logistics and Visuals
            </h2>

            {/* Location */}
            <FormField label="Farming Location" icon={<FaMapMarkerAlt />}>
              <input
                name="location"
                className="input input-bordered w-full focus:ring-green-500 focus:border-green-500"
                placeholder="City, State/Province (e.g., Dhaka, Bangladesh)"
                required
              />
            </FormField>

            {/* Image URL */}
            <FormField label="Image URL (Optional)" icon={<FaFeatherAlt />}>
              <input 
                name="image" 
                className="input input-bordered w-full focus:ring-green-500 focus:border-green-500" 
                placeholder="Link to a high-quality photo of the crop"
              />
            </FormField>
          </div>

          {/* Description - Larger, separate section */}
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50/70 shadow-inner">
            <FormField label="Detailed Description" icon={<FaFeatherAlt />}>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full h-32 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe the quality, harvest date, and specific characteristics of the crop."
                required
              ></textarea>
            </FormField>
          </div>

          {/* Submit Button - Themed and prominent */}
          <button 
            type="submit" 
            className="w-full py-3 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition duration-300 shadow-xl"
          >
            Submit Crop Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrops;