import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black ">
      <div
        className="footer flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-5 max-w-7xl mx-auto
      "
      >
        <div>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Pet Grooming</a>
          <a className="link link-hover">Veterinary Care</a>
          <a className="link link-hover">Pet Training</a>
          <a className="link link-hover">Pet Adoption</a>
        </div>

        <div>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Blog</a>
        </div>

        <div>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </div>

        <div>
          <h6 className="footer-title">Explore</h6>
          <a className="link link-hover">Features</a>
          <a className="link link-hover">Testimonials</a>
          <a className="link link-hover">FAQ</a>
          <a className="link link-hover">Pricing</a>
        </div>

        <div>
          <h6 className="footer-title">Apps</h6>
          <a className="link link-hover">iOS App</a>
          <a className="link link-hover">Android App</a>
          <a className="link link-hover">Web App</a>
          <a className="link link-hover">Desktop</a>
        </div>

        <div>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="hover:text-blue-400 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-pink-400 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-sky-400 transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-all duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400 font-semibold">PetCare</span> — All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
