import React from "react";
import { BahtIcon } from "../systemdesign/Icons";
import { WalletIcon } from "../systemdesign/Icons";
import { ArrowRightIcon, ArrowLeftIcon } from "../systemdesign/Icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dateTimeFormat } from "../../utils/timeFormat";

function PayoutOption() {
  const [payoutOption, setPayoutOption] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const newUser = JSON.parse(localStorage.getItem("user"));
  const getSitterPayoutOption = async (currentPage) => {
    try {
      const results = await axios.get(
        `/sitterManagement/${newUser.sitter_id}/payoutOption?page=${currentPage}`
      );
      console.log("sitterId", newUser.sitter_id);
      setPayoutOption(results.data.data);
      setCurrentPage(results.data.pagination.currentPage);
      setTotalPages(results.data.pagination.totalPages);
      setTotalAmount(results.data.totalAmount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getSitterPayoutOption(currentPage);
  }, [currentPage]);

  return (
    <section className="">
      <div className="flex flex-col h-screen gap-6 p-10 bg-gray-100">
        <h1 className=" text-headline3 text-[#2A2E3F]">Payout Option</h1>
        <div className=" w-full flex gap-6 text-body2">
          <div className=" w-full flex gap-4 p-6 bg-etc-white rounded-2xl text-etc-black">
            <h3 className=" w-full gap-2 flex flex-row">
              <BahtIcon /> Total Earning
            </h3>
            <div className=" w-auto gap-2 flex flex-row">
              {totalAmount}
              <h3>THB</h3>
            </div>
          </div>
          <div className=" w-full flex gap-4 p-6 bg-etc-white rounded-2xl ">
            <h3 className=" w-full gap-2 flex flex-row text-etc-black">
              <WalletIcon color="#000" />
              Bank Account
            </h3>
            <div className="w-auto gap-2 flex flex-row text-orange-500">
              <h3>SCB</h3>
              <h3>*444</h3>
              <ArrowRightIcon color="#AEB1C3" />
            </div>
          </div>
        </div>
        <div>
          <div className=" flex flex-row w-full bg-etc-black text-etc-white text-body3 rounded-t-2xl ">
            <div className=" w-[240px] px-4 py-3">
              <h3 className=" w-full h-auto">Date</h3>
            </div>
            <div className=" w-[240px] px-4 py-3">
              <h3 className=" w-full h-auto">From</h3>
            </div>
            <div className=" w-[200px] px-4 py-3">
              <h3 className=" w-full h-auto">Booking No.</h3>
            </div>
            <div className=" flex-1 w-full px-4 py-3">
              <h3 className=" w-full h-auto text-right">Amount</h3>
            </div>
          </div>
          {payoutOption && payoutOption.length > 0 ? (
            payoutOption.map((card) => (
              <div
                className="flex flex-row w-full bg-etc-white border-b border-gray-200 text-body2 text-[#2A2E3F] last:rounded-b-2xl last:border-none "
                key={card.booking_no}
              >
                <div className="w-[240px] px-4 py-6">
                  <h3 className="w-full h-auto">
                    {dateTimeFormat(card.booking_date)}
                  </h3>
                </div>
                <div className="w-[240px] px-4 py-6">
                  <h3 className="w-full h-auto">{card.full_name}</h3>
                </div>
                <div className="w-[200px] px-4 py-6">
                  <h3 className="w-full h-auto">{card.booking_no}</h3>
                </div>
                <div className="flex-1 w-full px-4 py-6">
                  <h3 className="w-full h-full text-right text-green-500">
                    {card.amount} THB
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6 bg-etc-white rounded-b-2xl ">
              No successful jobs found🐾
            </p>
          )}
        </div>
        {totalPages > 1 ? (
          <div className="flex justify-center items-center gap-3 font-bold text-gray-300">
            {currentPage > 1 ? (
              <button
                className="previous-button"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ArrowLeftIcon color="#AEB1C3" />
              </button>
            ) : null}

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`w-[40px] h-[40px] rounded-full hover:bg-orange-100 hover:text-orange-500 ${
                  index + 1 === currentPage
                    ? "bg-orange-100 text-orange-500"
                    : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            {currentPage < totalPages ? (
              <button
                className="next-button"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ArrowRightIcon color="#AEB1C3" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PayoutOption;
