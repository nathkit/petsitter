import { ButtonPrimary } from "../systemdesign/Button";
import { Ellipse16, Star1, Ellipse17 } from "../systemdesign/image";

export default function Banner() {
  return (
    <div className="w-full p-20 flex flex-col">
      <div className="w-full h-[448px] bg-yellow-100 rounded-[16px] relative overflow-hidden">
        <div className="absolute right-0 top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="199"
            height="190"
            viewBox="0 0 199 190"
            fill="none">
            <circle
              cx="114.548"
              cy="75.2333"
              r="114.5"
              transform="rotate(15 114.548 75.2333)"
              fill="#FFCA62"
            />
          </svg>
        </div>
        <div className="absolute bottom-[130px] left-[953px]">
          <Star1 width="191" height="186" />
        </div>
        <div className="absolute bottom-0">
          <Ellipse17 width="337" height="168" />
        </div>
        <div className="inline-flex flex-col justify-center items-center gap-10 w-[457px] h-[216px] mx-[411px] my-[116px]">
          <p className="text-headline1 text-etc-black text-center">
            Perfect Pet Sitter For Your Pet
          </p>
          <ButtonPrimary content="Find A Pet Sitter" width="120" />
        </div>
      </div>
    </div>
  );
}
