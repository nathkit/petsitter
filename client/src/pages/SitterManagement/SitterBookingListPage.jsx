import React from "react";
import SitterBookingList from "../../components/sitterManagement/SitterBookingList";
import SitterBar from "../../components/sitterManagement/SitterBar";
import { useEffect } from "react";
import usePosts from "../../hooks/usePost";
import { useParams } from "react-router-dom";

function SitterBookingListPage() {
  const params = useParams();
  const { getSitterBookingList, searchKeywords, bookingStatus } = usePosts();

  return (
    <SitterBar>
      <SitterBookingList />
    </SitterBar>
  );
}

export default SitterBookingListPage;
