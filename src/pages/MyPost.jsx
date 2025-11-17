import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editCrop, setEditCrop] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/byOwner/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCrops(data));
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

    fetch(`http://localhost:3000/products/${editCrop._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedCrop),
    })
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
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this crop?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your crop has been removed", "success");
            setCrops((previousCrops) =>
              previousCrops.filter((crop) => crop._id !== id)
            );
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {crops.map((crop) => (
              <tr key={crop._id}>
                <td>{crop.name}</td>
                <td>{crop.type}</td>
                <td>
                  {crop.pricePerUnit} / {crop.unit}
                </td>
                <td>{crop.quantity}</td>
                <td>{crop.location}</td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setEditCrop(crop)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(crop._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editCrop && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Crop</h3>

            <form onSubmit={handleUpdate} className="space-y-3 mt-4">
              <input
                name="name"
                defaultValue={editCrop.name}
                className="input input-bordered w-full"
                required
              />

              <select
                name="type"
                className="select select-bordered w-full"
                defaultValue={editCrop.type}
              >
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Grain</option>
              </select>

              <input
                name="price"
                defaultValue={editCrop.pricePerUnit}
                className="input input-bordered w-full"
                required
              />

              <select
                name="unit"
                className="select select-bordered w-full"
                defaultValue={editCrop.unit}
              >
                <option>kg</option>
                <option>ton</option>
                <option>bag</option>
              </select>

              <input
                name="quantity"
                defaultValue={editCrop.quantity}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                defaultValue={editCrop.description}
                className="textarea textarea-bordered w-full"
              />

              <input
                name="location"
                defaultValue={editCrop.location}
                className="input input-bordered w-full"
              />

              <input
                name="image"
                defaultValue={editCrop.image}
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                <button className="btn" onClick={() => setEditCrop(null)}>
                  Cancel
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
