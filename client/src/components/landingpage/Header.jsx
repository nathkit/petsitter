import {
  Star1,
  Ellipse15,
  Ellipse16,
  Ellipse17,
  Frame,
  Vector,
} from "../systemdesign/image";
import dog from "../../assets/SitterReview/Frame427320926.png";
import cats from "../../assets/SitterReview/Frame427320927.png";

export default function Header() {
  return (
    <div className="min-w-[1440px] flex pb-16 pt-20">
      <div className="relative w-[428px] h-[441px]">
        <div className="absolute top-[-5px] left-[230px] right-[35px]">
          <Vector width="163" height="169" />
        </div>
        <div className="absolute top-[81.5px] left-[67px] right-[243.5px]">
          <Ellipse15 width="117.5" height="117.5" />
        </div>
        <div className="absolute w-[253px] h-[253px] bottom-0 left-[121px] right-[54px]">
          <img src={cats} alt="Cats" />
        </div>
        <div className="absolute top-[176.5px] left-[162px] right-[187px]">
          <Frame width="79" height="44" />
        </div>
      </div>
      <div className="w-[544px] h-[352px] mt-[45px] mx-5">
        <p className="text-display text-center text-etc-black mb-8">
          Pet Sitter<span className="text-orange-500">, </span>
          Perfect<span className="text-blue-500">, </span>
          <br />
          For Your Pet<span className="text-yellow-200">.</span>
        </p>
        <p className="text-headline3 text-center text-gray-400">
          Find your perfect pet sitter with us.
        </p>
      </div>
      <div className="relative w-[428px] h-[441px]">
        <div className="absolute">
          <Star1 color="#FF7037" width="160" height="156" />
        </div>
        <div className="absolute bottom-0 left-[49px] right-[150px]">
          <Ellipse17 color="#1CCD83" width="229" height="115" />
        </div>
        <div className="absolute bottom-[103px] left-[64px] right-[300px]">
          <Ellipse16 color="#F6F6F9" width="67" height="67" />
        </div>
        <div className="absolute bottom-[108px] left-[95px] right-[72px]">
          <img src={dog} alt="Dog" />
        </div>
      </div>
    </div>
  );
}
