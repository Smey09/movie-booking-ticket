import React from "react";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-br from-indigo-900 to-blue-500 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-sm">
              We are dedicated to bringing you the best cinematic experience
              with state-of-the-art technology and comfortable seating.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p className="text-sm">
              Email: info@cinemabooking.com
              <br />
              Phone: +855 999 9999
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-300">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-300">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-300">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-300 pt-4">
          <p className="text-sm">
            &copy; 2025 Cinema Booking By NU Assigement Web. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
