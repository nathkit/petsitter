import React, { useState, useEffect } from "react";
import axios from "axios";
import SitterSearch from "../components/seacrhlistcomponent/SitterSearch.jsx";
import SitterCardList from "../components/seacrhlistcomponent/SitterCardList.jsx";
import Footer from "../components/systemdesign/Footer.jsx";

function SearchList() {
  useEffect(() => {
    searchPets();
  }, []);

  const [pets, setPets] = useState([]);
  // const [paging, setPaging] = useState({
  //   currentPage: 1,
  //   totalPage: 10,
  // });

  const searchPets = async (searchData) => {
    const searchParams = new URLSearchParams();
    if (searchData !== undefined) {
      if (searchData?.search) {
        searchParams.append("search", searchData.search);
      }

      if (searchData?.types.length > 0) {
        searchParams.append("petType", searchData.types);
      }

      if (searchData?.rate) {
        searchParams.append("rate", searchData.rate);
      }

      if (searchData?.exp) {
        searchParams.append("exp", searchData.exp);
      }
    }

    console.log(searchParams.toString());
    const result = await axios.get(
      "http://localhost:4000/sitter?" + searchParams.toString()
    );
    console.log(result);
    setPets(result.data.data);
  };

  return (
    <>
      <div className="flex flex-col w-[1440px] h-[1570px] pt-10 pb-20 px-20 bg-[#FAFAFB]">
        <div className="text-[24px] font-bold">Search For Pet Sitter</div>
        <div className="flex py-[80px] gap-9">
          <SitterSearch
            onSearch={(data) => {
              searchPets(data);
            }}
          />
          <SitterCardList items={pets} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchList;
