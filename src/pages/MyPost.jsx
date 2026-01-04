import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaTimes, FaSave, FaSeedling, FaMapMarkerAlt, FaTag, FaBalanceScale } from "react-icons/fa"; // Importing action and form icons

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editCrop, setEditCrop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://krishi-link-api-server.vercel.app/products/byOwner/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
        setIsLoading(false);
      });
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseFloat(form.price.value),
      unit: form.unit.value,
      quantity: parseFloat(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    fetch(
      `https://krishi-link-api-server.vercel.app/products/${editCrop._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedCrop),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Updated!", "Crop updated successfully!", "success");

        setCrops((previousCrops) =>
          previousCrops.map((cropItem) =>
            cropItem._id === editCrop._id
              ? { ...cropItem, ...updatedCrop }
              : cropItem
          )
        );

        setEditCrop(null);
      })
      .catch((error) => {
        console.error("Update failed:", error);
        Swal.fire("Error", "Failed to update crop. Please try again.", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this crop?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://krishi-link-api-server.vercel.app/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your crop has been removed", "success");
            setCrops((previousCrops) =>
              previousCrops.filter((crop) => crop._id !== id)
            );
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire("Error", "Failed to delete crop. Please try again.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center p-10 text-xl font-semibold text-green-600">
        Loading your posts...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 border-b-2 border-green-500 pb-2">
        📝 My Crop Listings
      </h1>

      {crops.length === 0 ? (
        <div className="text-center p-20 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-gray-500 font-medium">
            You have no active crop listings.
          </p>
          <p className="text-md text-gray-400 mt-2">
            Click 'Add Crops' to create your first post!
          </p>
        </div>
      ) : (
        // Responsive Table Container
        <div className="overflow-x-auto shadow-2xl rounded-xl bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600 text-white sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name / Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Price / Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {crops.map((crop) => (
                <tr key={crop._id} className="hover:bg-green-50/50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-12 h-12 object-cover rounded-md"
                      onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/50"}} // Fallback image
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{crop.name}</div>
                    <div className="text-xs text-gray-500">{crop.type}</div>
                  </td>
                  
                  {/* HIDDEN on small screens */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">
                    ₹{crop.pricePerUnit} / {crop.unit}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {crop.quantity}
                  </td>
                  
                  {/* HIDDEN on medium screens */}
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {crop.location}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                    <button
                      className="btn btn-warning btn-xs sm:btn-sm flex items-center gap-1 shadow-md hover:shadow-lg transition duration-150"
                      onClick={() => setEditCrop(crop)}
                    >
                      <FaEdit /> 
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    <button
                      className="btn btn-error btn-xs sm:btn-sm flex items-center gap-1 shadow-md hover:shadow-lg transition duration-150"
                      onClick={() => handleDelete(crop._id)}
                    >
                      <FaTrash />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editCrop && (
        <dialog open className="modal modal-middle">
          <div className="modal-box p-8 bg-white rounded-xl shadow-2xl max-w-lg">
            
            <h3 className="font-bold text-2xl text-green-700 border-b pb-2 mb-4">
              Edit Crop: {editCrop.name}
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              
              {/* Name & Type - Grouped */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="form-control w-full">
                    <span className="label-text flex items-center"><FaSeedling className="mr-2"/>Name</span>
                    <input name="name" defaultValue={editCrop.name} className="input input-bordered input-sm sm:input-md w-full focus:border-green-500" required />
                </label>
                <label className="form-control w-full">
                    <span className="label-text flex items-center"><FaSeedling className="mr-2"/>Type</span>
                    <select name="type" className="select select-bordered select-sm sm:select-md w-full focus:border-green-500" defaultValue={editCrop.type}>
                      <option>Vegetable</option>
                      <option>Fruit</option>
                      <option>Grain</option>
                      <option>Other</option>
                    </select>
                </label>
              </div>

              {/* Price & Unit & Quantity - Grouped */}
              <div className="grid grid-cols-3 gap-4">
                <label className="form-control col-span-1">
                    <span className="label-text flex items-center"><FaTag className="mr-2"/>Price</span>
                    <input name="price" type="number" step="0.01" defaultValue={editCrop.pricePerUnit} className="input input-bordered input-sm sm:input-md w-full focus:border-green-500" required />
                </label>
                <label className="form-control col-span-1">
                    <span className="label-text flex items-center"><FaBalanceScale className="mr-2"/>Unit</span>
                    <select name="unit" className="select select-bordered select-sm sm:select-md w-full focus:border-green-500" defaultValue={editCrop.unit}>
                      <option>kg</option>
                      <option>ton</option>
                      <option>bag</option>
                      <option>piece</option>
                    </select>
                </label>
                <label className="form-control col-span-1">
                    <span className="label-text flex items-center"><FaBalanceScale className="mr-2"/>Quantity</span>
                    <input name="quantity" type="number" defaultValue={editCrop.quantity} className="input input-bordered input-sm sm:input-md w-full focus:border-green-500" required />
                </label>
              </div>
              
              {/* Location */}
              <label className="form-control w-full">
                  <span className="label-text flex items-center"><FaMapMarkerAlt className="mr-2"/>Location</span>
                  <input name="location" defaultValue={editCrop.location} className="input input-bordered w-full focus:border-green-500" />
              </label>

              {/* Image URL */}
              <label className="form-control w-full">
                  <span className="label-text">Image URL</span>
                  <input name="image" defaultValue={editCrop.image} className="input input-bordered w-full focus:border-green-500" />
              </label>

              {/* Description */}
              <label className="form-control w-full">
                  <span className="label-text">Description</span>
                  <textarea name="description" defaultValue={editCrop.description} className="textarea textarea-bordered h-20 w-full focus:border-green-500" />
              </label>

              <div className="modal-action flex justify-end gap-3 mt-6">
                <button 
                  className="btn btn-success text-white flex items-center gap-1 shadow-lg hover:bg-green-700" 
                  type="submit"
                >
                  <FaSave /> Save Changes
                </button>
                <button 
                  className="btn btn-ghost flex items-center gap-1" 
                  type="button" 
                  onClick={() => setEditCrop(null)}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPost;