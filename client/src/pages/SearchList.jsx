import React, { useState, useEffect, useRef } from "react";
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
  const [searchData, setSearchData] = useState();
  const [pets, setPets] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const topRef = useRef(null);

  const handlePaging = (event, page) => {
    event.preventDefault();
    searchPets({ ...searchData, paging: page });
  };

  // useEffect(() => {
  //   searchPets({ ...searchData, paging });
  // }, [paging]);

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

      if (searchData?.paging) {
        searchParams.append("page", searchData.paging);
      }
    }

    const result = await axios.get(
      "/sitterManagement?" + searchParams.toString()
    );
    setPets(result.data.data);
    setPaging(result.data.paging);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-[1440px] h-[1570px] pt-10 pb-20 px-20 bg-[#FAFAFB]">
        <div className="text-[24px] font-bold">Search For Pet Sitter</div>
        <div className="flex  py-[80px] gap-9" ref={topRef}>
          <SitterSearch
            onSearch={(data) => {
              setSearchData(data);
              searchPets(data);
            }}
          />
          <SitterCardList items={pets} />
        </div>
        <div className="flex justify-center items-center gap-3 font-bold text-gray-300">
          <button
            className="p-[10px]"
            onClick={(e) => {
              if (paging.currentPage > 1) {
                handlePaging(e, paging.currentPage - 1);
              }
            }}
          >
            <ArrowLeftIcon color="#AEB1C3" />
          </button>
          {Array.from({ length: paging.totalPages }, (_, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] rounded-full hover:bg-orange-100 hover:text-orange-500 ${
                index + 1 === paging.currentPage
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={(e) => {
                handlePaging(e, index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-[10px]"
            onClick={(e) => {
              if (paging.currentPage < paging.totalPages) {
                handlePaging(e, paging.currentPage + 1);
              }
            }}
          >
            <ArrowRightIcon color="#AEB1C3" />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchList;
