import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddCrops = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

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
          navigate("/myPost");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Crop</h1>

      <form onSubmit={handleAddCrop} className="space-y-4">
        <div>
          <label>Name</label>
          <input name="name" className="input input-bordered w-full" required />
        </div>

        <div>
          <label>Type</label>
          <select
            name="type"
            className="select select-bordered w-full"
            required
          >
            <option>Vegetable</option>
            <option>Fruit</option>
            <option>Grain</option>
          </select>
        </div>

        <div>
          <label>Price per unit</label>
          <input
            name="price"
            type="number"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label>Unit</label>
          <select
            name="unit"
            className="select select-bordered w-full"
            required
          >
            <option>kg</option>
            <option>ton</option>
            <option>bag</option>
          </select>
        </div>

        <div>
          <label>Estimated quantity</label>
          <input
            name="quantity"
            type="number"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label>Location</label>
          <input
            name="location"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input name="image" className="input input-bordered w-full" />
        </div>

        <button className="btn btn-primary w-full">Add Crop</button>
      </form>
    </div>
  );
};

export default AddCrops;
