import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X icon

const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-800 mt-60">
      <div className="footer flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-8 max-w-7xl mx-auto">
        <div>
          <h6 className="footer-title font-semibold mb-3">Services</h6>
          <a className="link link-hover block">Crop Marketplace</a>
          <a className="link link-hover block">Farm Management</a>
          <a className="link link-hover block">Agro Education</a>
          <a className="link link-hover block">Market Insights</a>
        </div>

        <div>
          <h6 className="footer-title font-semibold mb-3">Company</h6>
          <a className="link link-hover block">About Us</a>
          <a className="link link-hover block">Contact</a>
          <a className="link link-hover block">Careers</a>
          <a className="link link-hover block">Blog</a>
        </div>

        <div>
          <h6 className="footer-title font-semibold mb-3">Legal</h6>
          <a className="link link-hover block">Terms of Use</a>
          <a className="link link-hover block">Privacy Policy</a>
          <a className="link link-hover block">Cookie Policy</a>
        </div>

        <div>
          <h6 className="footer-title font-semibold mb-3">Explore</h6>
          <a className="link link-hover block">Features</a>
          <a className="link link-hover block">Testimonials</a>
          <a className="link link-hover block">FAQ</a>
          <a className="link link-hover block">Pricing</a>
        </div>

        <div>
          <h6 className="footer-title font-semibold mb-3">Apps</h6>
          <a className="link link-hover block">iOS App</a>
          <a className="link link-hover block">Android App</a>
          <a className="link link-hover block">Web App</a>
          <a className="link link-hover block">Desktop</a>
        </div>

        <div>
          <h6 className="footer-title font-semibold mb-3">Follow Us</h6>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="#"
              className="hover:text-blue-600 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-gray-800 transition-all duration-300"
            >
              <SiX />
            </a>
            <a
              href="#"
              className="hover:text-gray-600 transition-all duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-400 pt-6 text-center">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-700">KrishiLink</span> — All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
