import React from "react";
import SitterProfile from "../../components/sitterManagement/SitterProfile";
import SitterBar from "../../components/sitterManagement/SitterBar";
import { useParams } from "react-router-dom";
function SitterProfilePage() {
  const params = useParams();
  return (
    <SitterBar>
      <SitterProfile update={params.sitterId ? true : null} />
    </SitterBar>
  );
}

export default SitterProfilePage;
