import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FacebookIcon } from "../components/systemdesign/Icons";
import Showcase from "../components/landingpage/ShowCase";
import Banner from "../components/landingpage/Banner";
import Footer from "../components/systemdesign/Footer";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonGhost,
  ButtonSocial,
  ButtonIcon,
} from "../components/systemdesign/Button";
function HomePage() {
  return (
    <div className="bg-etc-white">
      <Showcase />
      <Banner />
      <Footer />
    </div>
  );
}

export default HomePage;
