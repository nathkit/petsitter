import React from "react";
import { ImageProvider } from "../contexts/StarRatingContext";
import SitterDetail from "../components/sittedetail/SitterDetail";
import Footer from "../components/systemdesign/Footer";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div>
        <>
          {/* nav */}
          <SitterDetail/>
          <Footer/>
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
