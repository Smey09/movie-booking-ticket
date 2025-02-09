import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import NowShowing from "../components/NowShowing";
import TheaterListsByMovie from "../components/TheaterListsByMovie";
import { AuthContext } from "../context/AuthContext";
import Hero from "../components/Hero";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(
    parseInt(sessionStorage.getItem("selectedMovieIndex"))
  );
  const [movies, setMovies] = useState([]);
  const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false);

  const fetchMovies = async (data) => {
    try {
      setIsFetchingMoviesDone(false);
      let response;
      if (auth.role === "admin") {
        response = await axios.get("/movie/unreleased/showing", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
      } else {
        response = await axios.get("/movie/showing");
      }
      // console.log(response.data.data)
      setMovies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingMoviesDone(true);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const props = {
    movies,
    selectedMovieIndex,
    setSelectedMovieIndex,
    auth,
    isFetchingMoviesDone,
  };

  // please call image from
  const mockImages = [
    "https://i.ytimg.com/vi/CiJQbBEAZ7I/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFUqlE9ZvYaq4q7XITxUXMeDm9lGn2K7c6p93RHjnB2PVF9HygqzCN0uOa7GwT6IJeKg&usqp=CAU",
    "https://images.prestigeonline.com/wp-content/uploads/sites/9/2024/08/09150109/Neaths-Love-Story-scaled.jpg?tr=w-1200,h-900",
  ];

  const firstShow = {
    name: "The Grand Cinema Experience",
    description:
      "Join us for an unforgettable journey through the world of cinema.",
    showtime: "Today at 7:00 PM",
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-900 to-blue-500 pb-8">
      <Navbar />
      <div className="mb-4 lg:mb-8">
        <Hero firstShow={firstShow} images={mockImages} />
      </div>
      <NowShowing {...props} />
      {movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
    </div>
  );
};

export default Home;
