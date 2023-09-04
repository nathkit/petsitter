import React from "react";
import SitterReview from "../components/SitterReview";
import { ImageProvider } from "../contexts/StarRatingContext";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div>
        <>
          {/* nav */}
          {/*  ly */}
          {/*  ly*/}
          <SitterReview />
          {/* foot */}
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
