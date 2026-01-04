import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSort } from "react-icons/fa"; // Importing an icon for the sort functionality

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [sortType, setSortType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Function to determine badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 ring-1 ring-green-600/50";
      case "rejected":
        return "bg-red-100 text-red-700 ring-1 ring-red-600/50";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/50";
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    setIsLoading(true);
    // Fetch interests data using the user's email
    fetch(
      `https://krishi-link-api-server.vercel.app/my-interests/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch interests:", error);
        setIsLoading(false);
      });
  }, [user]);

  // SORTING FUNCTION
  const sortedInterests = [...interests].sort((a, b) => {
    if (sortType === "name") {
      return a.cropName.localeCompare(b.cropName);
    }
    if (sortType === "owner") {
      return a.ownerName.localeCompare(b.ownerName);
    }
    if (sortType === "quantity") {
      // Assuming 'quantity' is a number
      return parseFloat(a.quantity) - parseFloat(b.quantity); 
    }
    if (sortType === "status") {
      // Assign weights for desired sort order (Pending first, then Accepted, then Rejected)
      const order = { pending: 1, accepted: 2, rejected: 3 }; 
      return (order[a.status] || 99) - (order[b.status] || 99);
    }

    return 0; // default (no sorting)
  });

  if (isLoading) {
    return (
      <div className="text-center p-10 text-xl font-semibold text-green-600">
        Loading your interests...
      </div>
    );
  }

  return (
    // Responsive outer padding and background
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 border-b-2 border-green-500 pb-2">
        💚 My Product Interests
      </h1>

      {/* SORT DROPDOWN AND CONTROLS */}
      <div className="flex justify-end mb-6">
        <div className="relative inline-block w-full sm:w-auto"> 
          {/* Full width on mobile, auto width on small screens and up */}
          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="appearance-none select select-bordered pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white text-gray-700 transition w-full sm:w-auto"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By...</option>
            <option value="name">Crop Name (A-Z)</option>
            <option value="owner">Owner Name (A-Z)</option>
            <option value="quantity">Quantity (Low → High)</option>
            <option value="status">Status Order</option>
          </select>
        </div>
      </div>

      {sortedInterests.length === 0 ? (
        <div className="text-center p-20 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-gray-500 font-medium">
            You haven't shown interest in any crops yet.
          </p>
          <p className="text-md text-gray-400 mt-2">
            Find some great listings on the main product page!
          </p>
        </div>
      ) : (
        // Table container ensures horizontal scrolling on small screens
        <div className="overflow-x-auto shadow-2xl rounded-xl bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600 text-white sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Crop Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                {/* HIDE on small screens for better mobile fit */}
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Message</th> 
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sortedInterests.map((item, i) => (
                <tr 
                  key={i} 
                  className="hover:bg-green-50/50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.cropName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.ownerName}</div>
                    <div className="text-xs text-gray-500">{item.ownerEmail}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.quantity} {item.unit || ""}
                  </td>

                  {/* HIDDEN on small screens */}
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs"> 
                    {item.message}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase shadow-sm ${getStatusBadge(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterest;