import React from "react";
import SitterReview from "../components/sittedetail/SitterReview";
import { ImageProvider } from "../contexts/StarRatingContext";
import SitterDetail from "../components/sittedetail/SitterDetail";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div className=" h-screen bg-etc-bg_gray">
        <>
          {/* nav */}
          <SitterDetail/>
          {/* <SitterReview /> */}
          {/* foot */}
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
