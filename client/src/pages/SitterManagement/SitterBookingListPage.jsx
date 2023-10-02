import React from "react";
import SitterBookingList from "../../components/sitterManagement/SitterBookingList";
import SitterBar from "../../components/sitterManagement/SitterBar";

function SitterBookingListPage() {
  return (
    <SitterBar>
      <SitterBookingList />
    </SitterBar>
  );
}

export default SitterBookingListPage;
