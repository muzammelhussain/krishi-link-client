import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);

  // Load profile from DB
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [user]);
  console.log(profile);

  // Update profile
  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      image: form.image.value,
    };

    fetch(`http://localhost:3000/users/${user.email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Updated!", "Profile updated successfully!", "success");

        // update UI immediately
        setProfile((prevProfile) => ({ ...prevProfile, ...updatedUser }));

        setEditProfile(null);
      });
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-6">My Profile</h1>

      <div className="max-w-md bg-white p-6 rounded-lg shadow mx-auto">
        <img
          src={profile.image}
          className="w-24 h-24 rounded-full mb-4 mx-auto"
          alt="Profile"
        />

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
        </div>

        <button
          className="btn btn-warning w-full mt-5"
          onClick={() => setEditProfile(profile)}
        >
          Edit Profile
        </button>
      </div>

      {editProfile && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-3 mt-4">
              <input
                name="name"
                defaultValue={profile.name}
                className="input input-bordered w-full"
                required
              />

              <input
                name="phone"
                defaultValue={profile.phone}
                className="input input-bordered w-full"
              />

              <input
                name="address"
                defaultValue={profile.address}
                className="input input-bordered w-full"
              />

              <input
                name="image"
                defaultValue={profile.image}
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                <button className="btn" onClick={() => setEditProfile(null)}>
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

export default Profile;
