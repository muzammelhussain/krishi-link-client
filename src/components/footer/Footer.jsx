import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLeaf,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-[#3E4B26] text-white mt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT – Newsletter */}
        <div
          className="relative bg-cover bg-center p-10 lg:p-16"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1592982537447-7440770cbfc9)",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 max-w-md">
            <p className="uppercase tracking-widest text-sm text-green-300 mb-2">
              For Latest Updates
            </p>

            <h2 className="text-3xl font-bold mb-6">
              Join Our Newsletter
            </h2>

            <form className="flex bg-white rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-5 py-3 text-gray-800 outline-none"
                required
              />
              <button
                type="submit"
                className="bg-lime-300 text-black px-6 font-semibold hover:bg-lime-400 transition"
              >
                Submit
              </button>
            </form>

            <p className="text-xs mt-4 text-gray-300">
              You can unsubscribe anytime. Read our{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              &{" "}
              <Link to="/terms" className="underline">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT – Footer Content */}
        <div className="p-10 lg:p-16">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <FaLeaf className="text-lime-300" /> KrishiLink
            </h2>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="text-sm">Follow Us:</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF className="hover:text-lime-300" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <SiX className="hover:text-lime-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-lime-300" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-lime-300" />
              </a>
            </div>
          </div>

          <hr className="border-white/20 mb-10" />

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Got A Question?</h4>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex gap-2">
                  <FaMapMarkerAlt className="text-lime-300 mt-1" />
                  Dhaka, Bangladesh
                </li>
                <li className="flex gap-2">
                  <FaPhoneAlt className="text-lime-300" />
                  +880 1XXX-XXXXXX
                </li>
                <li className="flex gap-2">
                  <FaEnvelope className="text-lime-300" />
                  support@krishilink.com
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-lime-300">Home</Link></li>
                <li><Link to="/careers" className="hover:text-lime-300">Careers</Link></li>
                <li><Link to="/faq" className="hover:text-lime-300">Frequent Q&A</Link></li>
                <li><Link to="/projects" className="hover:text-lime-300">Projects</Link></li>
                <li><Link to="/blog" className="hover:text-lime-300">Blog</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Crop Marketplace</li>
                <li>Farm Management</li>
                <li>Agro Education</li>
                <li>Market Insights</li>
              </ul>
            </div>
          </div>

          <hr className="border-white/20 my-10" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-300">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-lime-300 font-semibold">KrishiLink</span>. All
              rights reserved.
            </p>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <Link to="/privacy" className="hover:text-lime-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-lime-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
