import React from "react";
import { ImageProvider } from "../contexts/StarRatingContext";
import SitterDetail from "../components/sittedetail/SitterDetail";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div>
        <>
          {/* nav */}
          <SitterDetail/>
          {/* foot */}
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
