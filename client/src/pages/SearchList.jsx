import React, { useState, useEffect } from "react";
import SitterSearch from "../components/SeacrhListComponent/SitterSearch.jsx";
import SitterCardList from "../components/SeacrhListComponent/SitterCardList.jsx";
import sitterData from "../components/SitterDetailData.jsx";
function SearchList() {
  useEffect(() => {
    searchPets();
  }, []);

  const [pets, setPets] = useState([]);
  // const [paging, setPaging] = useState({
  //   currentPage: 1,
  //   totalPage: 10,
  // });

  const [searchData, setSearchData] = useState({
    search: "",
    types: [],
    rate: undefined,
    exp: undefined,
  });

  const searchPets = (searchData) => {
    // Call api
    // SetPets
    setPets(sitterData);
  };

  return (
    <div className="flex flex-col w-[1440px] h-[1570px] pt-10 pb-20 px-20 bg-[#FAFAFB]">
      <div className="text-[24] font-bold">Search For Pet Sitter</div>
      <div className="flex py-[80px] gap-9">
        <SitterSearch />
        <SitterCardList items={pets} />
      </div>
    </div>
  );
}

export default SearchList;
