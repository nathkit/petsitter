import React, { useState, useEffect } from "react";
import axios from "axios";
import SitterSearch from "../components/seacrhlistcomponent/SitterSearch.jsx";
import SitterCardList from "../components/seacrhlistcomponent/SitterCardList.jsx";
import Footer from "../components/systemdesign/Footer.jsx";
import Navbar from "../components/systemdesign/Navbar.jsx";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../components/systemdesign/Icons.jsx";

function SearchList() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPage: 5,
  });

  const handlePaging = (event, page) => {
    event.preventDefault();
    setPaging({
      ...paging,
      currentPage: page,
    });
    searchPets();
  };

  useEffect(() => {
    if (paging) {
      console.log(paging);
    }
  }, [paging]);

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
    if (paging.page > 1) {
      searchParams.append("page", paging.page);
    }

    const result = await axios.get(
      "/sitterManagement?" + searchParams.toString()
    );
    console.log(searchParams);
    setPets(result.data.data);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-[1440px] h-[1570px] pt-10 pb-20 px-20 bg-[#FAFAFB]">
        <div className="text-[24px] font-bold">Search For Pet Sitter</div>
        <div className="flex h-[1360px] py-[80px] gap-9">
          <SitterSearch
            onSearch={(data) => {
              searchPets(data);
            }}
          />
          <SitterCardList items={pets} />
        </div>
        <div className="flex justify-center items-center gap-3 font-bold text-gray-300">
          <button className="p-[10px] ">
            <ArrowLeftIcon color="#AEB1C3" />
          </button>
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className="w-[40px] h-[40px] rounded-full hover:bg-orange-100 hover:text-orange-500"
              onClick={(e) => {
                handlePaging(e, index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          <button className="p-[10px] ">
            <ArrowRightIcon color="#AEB1C3" />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchList;
