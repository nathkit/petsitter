import React from "react";
import SitterReview from "../components/SitterReview";
import { ImageProvider } from "../contexts/StarRatingContext";
import SitterDetail from "../components/SitterDetail";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div>
        <>
          {/* nav */}
          <SitterDetail/>
          <SitterReview />
          {/* foot */}
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
