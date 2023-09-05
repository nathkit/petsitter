import React from "react";
import { StarIcon, MapMakerIcon } from "../systemdesign/Icons.jsx";
import {
  DogType,
  CatType,
  BirdType,
  RabbitType,
} from "../systemdesign/PetType.jsx";
import sitterData from "../SitterDetailData.jsx";
import sitterCardData from "../../assets/SitterCard/sittercarddata.js";

function SitterCard(props) {
  const { trade_name, images, location, rating_star, pets } = props;

  return (
    <div className="w-[848px] h-[216px]">
      {sitterCardData.map((card) => {
        return (
          <div className="flex p-4 gap-10 bg-etc-white rounded-[16px] hover:border-[#FF7037] hover:border-solid hover:border-[1px]">
            <img
              src={card.place}
              alt={card.trade_name}
              className="object-none w-[245px] h-[184px]"
            />
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div>
                  <img
                    src={card.avatar}
                    alt={card.trade_name}
                    className="object-none w-[64px] h-[64px]"
                  />
                </div>
                <div className="w-[315px] h-[32px]">
                  <span className="text-[24px] font-bold">
                    {card.trade_name}
                    <br />
                  </span>
                  <span className="text-[18px] font-medium">
                    By {card.siiter_name}
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: rating_star }).map((_, index) => (
                    <StarIcon key={index} color="#1CCD83" />
                  ))}
                </div>
              </div>
              <div className="flex gap-[6px]">
                <div>
                  <MapMakerIcon color="#AEB1C3" />
                </div>
                <div className="text-[#7B7E8F] text-[16px] font-medium">
                  {card.location}
                </div>
              </div>
              <div className="flex gap-2">{pets}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SitterCardList({ items }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((sitter, index) => (
        <SitterCard key={index} {...sitter} />
      ))}
    </div>
  );
}

export default SitterCardList;
