import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = ({ firstShow, images = [] }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image Slider */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key={currentImageIndex}
      >
        <img
          src={
            images[currentImageIndex] ||
            "https://i.ytimg.com/vi/CiJQbBEAZ7I/maxresdefault.jpg"
          }
          alt={firstShow?.name || "Movie Poster"}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-wide drop-shadow-2xl">
          {firstShow?.name || "Experience the Magic of Cinema"}
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl mt-6 mb-10 opacity-90 max-w-2xl mx-auto">
          {firstShow?.description ||
            "Book your tickets now and enjoy the show!"}
        </p>

        {/* Showtime and Booking Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <p className="text-2xl sm:text-3xl font-semibold drop-shadow-lg">
            {firstShow?.showtime || "Today at 7:00 PM"}
          </p>
          <motion.button
            onClick={() => navigate("/cinema")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
