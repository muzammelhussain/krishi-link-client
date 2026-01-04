import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaUsers, FaBoxes, FaWeightHanging, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// --- CONFIGURATION CONSTANTS ---
const PRODUCTS_PER_PAGE = 10;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, summaryRes] = await Promise.all([
          // Fetch products (for the table)
          fetch("https://krishi-link-api-server.vercel.app/products"),
          // Fetch summary (for cards and bar chart)
          fetch("https://krishi-link-api-server.vercel.app/dashboard"),
        ]);

        const productsData = await productsRes.json();
        const summaryData = await summaryRes.json();

        setProducts(productsData);
        setSummary(summaryData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  // Slice the full products array to get products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }

  // --- RENDERING ---
  if (loading) return <div className="text-center p-10 text-xl font-semibold text-green-600">Loading Dashboard Data...</div>;
  if (!summary) return <div className="text-center p-10 text-xl font-semibold text-red-600">Failed to load summary data.</div>;

  // Chart Data preparation (kept for completeness)
  const barChartData = {
    labels: summary.productTypes,
    datasets: [
      {
        label: "Number of Products",
        data: summary.productsByType,
        backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f87171", "#a78bfa"],
        borderColor: ["#059669", "#2563eb", "#d97706", "#dc2626", "#7c3aed"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: products.map((p) => p.name).slice(0, 10),
    datasets: [
      {
        label: "Interests",
        data: products.map((p) => p.interests?.length || 0).slice(0, 10),
        backgroundColor: products.map((_, i) => `hsl(${(i * 36) % 360}, 70%, 60%)`),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen p-4 sm:p-6 space-y-8">
      
      {/* Overview Cards (unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Users */}
        <div className="flex items-center p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl bg-green-100 text-green-800">
          <FaUsers className="text-4xl sm:text-5xl mr-4" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">Total Users</p>
            <p className="text-2xl sm:text-3xl font-bold">{summary.totalUsers}</p>
          </div>
        </div>

        {/* Card 2: Total Products */}
        <div className="flex items-center p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl bg-blue-100 text-blue-800">
          <FaBoxes className="text-4xl sm:text-5xl mr-4" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">Total Products</p>
            <p className="text-2xl sm:text-3xl font-bold">{summary.totalProducts}</p>
          </div>
        </div>

        {/* Card 3: Total Quantity */}
        <div className="flex items-center p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl bg-yellow-100 text-yellow-800">
          <FaWeightHanging className="text-4xl sm:text-5xl mr-4" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">Total Quantity</p>
            <p className="text-2xl sm:text-3xl font-bold">{summary.totalQuantity} kg</p>
          </div>
        </div>

        {/* Card 4: Total Interests */}
        <div className="flex items-center p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl bg-pink-100 text-pink-800">
          <FaHeart className="text-4xl sm:text-5xl mr-4" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">Total Interests</p>
            <p className="text-2xl sm:text-3xl font-bold">{summary.totalInterests}</p>
          </div>
        </div>
      </div>

      {/* Charts (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Products by Type</h2>
          <div className="h-64 md:h-80 w-full"> 
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="p-6 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Top 10 Interest Distribution</h2>
          <div className="flex justify-center items-center h-64 md:h-80 w-full">
            <div className="w-full h-full p-4">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" } } }} />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table with Pagination */}
      <div className="p-2 rounded-xl shadow-xl bg-white">
        <h2 className="text-xl font-bold p-4 pb-2 border-b">Product Listings</h2>
        
        {/* Table Container */}
        <div className="overflow-x-auto p-2">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100 sticky top-0 text-xs sm:text-sm">
              <tr>
                <th className="px-3 py-3 text-left w-16">Image</th>
                <th className="px-3 py-3 text-left">Name</th>
                <th className="px-3 py-3 text-left hidden sm:table-cell">Type</th>
                <th className="px-3 py-3 text-left">Quantity</th>
                <th className="px-3 py-3 text-left hidden lg:table-cell">Price/Unit</th>
                <th className="px-3 py-3 text-left hidden md:table-cell">Owner</th>
                <th className="px-3 py-3 text-left hidden lg:table-cell">Location</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Render only the products for the current page */}
              {currentProducts.map((p) => (
                <tr key={p._id} className="border-b border-gray-200 hover:bg-green-50/50 transition duration-150">
                  <td className="px-3 py-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover" />
                  </td>
                  <td className="px-3 py-3 font-medium text-xs sm:text-sm">{p.name}</td>
                  <td className="px-3 py-3 hidden sm:table-cell">{p.type}</td>
                  <td className="px-3 py-3">{p.quantity} {p.unit}</td>
                  <td className="px-3 py-3 hidden lg:table-cell">{p.pricePerUnit}</td>
                  <td className="px-3 py-3 hidden md:table-cell text-xs sm:text-sm">{p.owner?.ownerName || 'N/A'}</td>
                  <td className="px-3 py-3 hidden lg:table-cell text-xs sm:text-sm">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* --- PAGINATION CONTROLS --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t mt-4">
            
            {/* Displaying Current Range */}
            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of {products.length} products
            </div>

            {/* Buttons and Page Numbers */}
            <div className="flex items-center space-x-2">
                
                {/* Previous Button */}
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <FaChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Display (Simple implementation) */}
                <span className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-sm shadow-md">
                    Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <FaChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;