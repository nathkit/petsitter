import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FacebookIcon } from "../components/systemdesign/Icons";
import Header from "../components/landingpage/Header";
import FilterBar from "../components/landingpage/FilterBar";
import Showcase from "../components/landingpage/ShowCase";
import Banner from "../components/landingpage/Banner";
import Footer from "../components/systemdesign/Footer";
import Navbar from "../components/systemdesign/Navbar";
import { useAuth } from "../contexts/authentication";
import { useEffect } from "react";
import axios from "axios";

function HomePage() {
  const { getUserData, user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://petsitter-sever.onrender.com"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-etc-white min-h-screen">
      <Navbar />
      <Header />
      <FilterBar />
      <Showcase />
      <Banner />
      <Footer />
    </div>
  );
}

export default HomePage;
