import React from "react";
import SitterProfile from "../../components/sitterManagement/SitterProfile";
import SitterBar from "../../components/sitterManagement/SitterBar";
function SitterProfilePage() {
  return (
    <SitterBar>
      <SitterProfile />
    </SitterBar>
  );
}

export default SitterProfilePage;
