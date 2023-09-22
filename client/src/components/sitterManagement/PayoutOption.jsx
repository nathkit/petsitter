import React from "react";
import { BahtIcon } from "../systemdesign/Icons";
import { WalletIcon } from "../systemdesign/Icons";
import { ArrowRightIcon } from "../systemdesign/Icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dateTimeFormat } from "../../utils/timeFormat";

function PayoutOption() {
  const [payoutOption, setPayoutOption] = useState([]);

  const params = useParams();

  const getSitterPayoutOption = async () => {
    try {
      const results = await axios.get(
        `/sitterManagement/${params.sitterId}/payoutOption`
      );
      console.log("sitterId", params.sitterId);
      // console.log(results);
      setPayoutOption(results.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getSitterPayoutOption();
  }, []);

  return (
    <section className="flex flex-col gap-6 p-10 bg-gray-100">
      <h1 className=" text-headline3 text-gray-900">Payout Option</h1>
      <div className=" w-full flex gap-6 text-body2">
        <div className=" w-full flex gap-4 p-6 bg-etc-white rounded-2xl text-etc-black">
          <h3 className=" w-full gap-2 flex flex-row">
            <BahtIcon /> Total Earning
          </h3>
          <div className=" w-auto gap-2 flex flex-row">
          {payoutOption.reduce((total, card) => total + parseFloat(card.amount), 0).toFixed(2)} <h3>THB</h3>
          </div>
        </div>
        <div className=" w-full flex gap-4 p-6 bg-etc-white rounded-2xl ">
          <h3 className=" w-full gap-2 flex flex-row text-etc-black">
            <WalletIcon color="#AEB1C3" />
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
        <div className=" flex flex-row w-full bg-etc-black text-etc-white text-body3 rounded-t-2xl">
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
              className="flex flex-row w-full bg-etc-white border-b border-gray-200 text-body2"
              key={card.booking_no}
            >
              <div className="w-[240px] px-4 py-6">
                <h3 className="w-full h-auto">{dateTimeFormat(card.booking_date)}</h3>
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
          <p className="text-center">Not found 🐾</p>
        )}
      </div>
    </section>
  );
}

export default PayoutOption;
