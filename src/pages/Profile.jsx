import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaUserEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user)
  // Load profile from DB
  useEffect(() => {
    if (!user?.email) return;

    setIsLoading(true);
    fetch(`https://krishi-link-api-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
        setIsLoading(false);
      });
  }, [user]);

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      image: form.image.value,
    };

    try {
      const res = await fetch(
        `https://krishi-link-api-server.vercel.app/users/${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        Swal.fire("Error", errorData.error || "Update failed", "error");
        return;
      }

      // No need to await res.json() if you don't use the result
      await res.json(); 

      Swal.fire("Updated!", "Profile updated successfully!", "success");

      // Update UI instantly
      setProfile((old) => ({
        ...old,
        ...updatedUser,
      }));

      setEditProfile(null);
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10 text-xl font-semibold text-green-600">
        Loading profile data...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-10 text-xl text-red-600">
        Error: Could not load user profile.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800 border-b-2 border-green-500 pb-2">
        👤 My Profile
      </h1>

      {/* --- PROFILE CARD DISPLAY --- */}
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-green-100">
        
        {/* Profile Image & Name Section */}
        <div className="text-center mb-8">
          <img
            src={profile.image || user.photoURL || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full mb-4 mx-auto object-cover border-4 border-green-300 shadow-md"
            alt={`${profile.name}'s Profile`}
          />
          <h2 className="text-3xl font-bold text-gray-800">{profile.name || "User Name"}</h2>
          <p className="text-sm text-green-600 mt-1">KrishiLink Member</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4 border-t pt-4">
          
          <div className="flex items-center text-gray-700">
            <FaEnvelope className="text-green-500 mr-3 w-5 h-5" />
            <strong className="w-24">Email:</strong>
            <span className="flex-1 truncate">{profile.email}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <FaPhone className="text-green-500 mr-3 w-5 h-5" />
            <strong className="w-24">Phone:</strong>
            <span className="flex-1">{profile.phone || "N/A"}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-green-500 mr-3 w-5 h-5 flex-shrink-0" />
            <strong className="w-24">Address:</strong>
            <span className="flex-1">{profile.address || "Not set"}</span>
          </div>

        </div>

        {/* Edit Button */}
        <button
          className="btn btn-warning w-full mt-8 text-lg font-semibold flex items-center gap-2 hover:bg-yellow-600 transition"
          onClick={() => setEditProfile(profile)}
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      {/* --- EDIT MODAL --- */}
      {editProfile && (
        <dialog open className="modal modal-middle">
          <div className="modal-box p-6 sm:p-8 bg-white rounded-xl shadow-2xl max-w-md">
            
            <h3 className="font-bold text-2xl text-green-700 border-b pb-3 mb-5 flex items-center">
              <FaUserEdit className="mr-2"/> Update Profile Information
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              
              {/* Name */}
              <label className="form-control w-full">
                  <span className="label-text flex items-center"><FaUser className="mr-2"/>Full Name</span>
                  <input name="name" defaultValue={profile.name} className="input input-bordered w-full focus:border-green-500" required />
              </label>

              {/* Phone */}
              <label className="form-control w-full">
                  <span className="label-text flex items-center"><FaPhone className="mr-2"/>Phone Number</span>
                  <input name="phone" defaultValue={profile.phone} className="input input-bordered w-full focus:border-green-500" placeholder="e.g., +8801XXXXXXXXX" />
              </label>

              {/* Address */}
              <label className="form-control w-full">
                  <span className="label-text flex items-center"><FaMapMarkerAlt className="mr-2"/>Address</span>
                  <input name="address" defaultValue={profile.address} className="input input-bordered w-full focus:border-green-500" placeholder="City, State, Country" />
              </label>

              {/* Image URL */}
              <label className="form-control w-full">
                  <span className="label-text">Profile Image URL</span>
                  <input name="image" defaultValue={profile.image} className="input input-bordered w-full focus:border-green-500" placeholder="Link to your profile photo" />
              </label>

              <div className="modal-action flex justify-end gap-3 pt-4">
                <button 
                  className="btn btn-success text-white flex items-center gap-1 shadow-lg hover:bg-green-700" 
                  type="submit"
                >
                  <FaSave /> Save Changes
                </button>
                <button 
                  className="btn btn-ghost flex items-center gap-1" 
                  type="button" 
                  onClick={() => setEditProfile(null)}
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

export default Profile;