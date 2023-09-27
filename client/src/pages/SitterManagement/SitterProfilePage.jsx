import React from "react";
import SitterProfile from "../../components/sitterManagement/SitterProfile";
import SitterBar from "../../components/sitterManagement/SitterBar";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
function SitterProfilePage() {
  const { isPetSitter } = useAuth();
  const params = useParams();

  return (
    <SitterBar>
      <SitterProfile update={isPetSitter ? true : null} />
    </SitterBar>
  );
}

export default SitterProfilePage;
