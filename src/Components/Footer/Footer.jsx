import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 px-6 py-10 bg-base-100 text-base-content neumorphism rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-primary">📘 Durjog BD</h2>
          <p className="mt-2 text-sm">
            Empowering voices, sharing stories. A platform for all during all
            storms.
          </p>
          <div className="flex mt-4 space-x-3 text-xl">
            <a href="#" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-blogs" className="hover:text-primary">
                All Blogs
              </Link>
            </li>
            <li>
              <Link to="/add-blog" className="hover:text-primary">
                Add Blog
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider mt-10"></div>

      <div className="text-center text-sm text-base-content">
        &copy; {new Date().getFullYear()} Durjog BD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
