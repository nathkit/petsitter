import { useNavigate } from "react-router-dom";
import {
  Star1,
  Vector,
  Ellipse15,
  Ellipse14,
  Ellipse16,
} from "../components/systemdesign/image";

function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className="bg-etc-white min-h-screen w-full relative flex justify-center items-center ">
      <div className="h-[40%] w-[30%]  absolute bottom-0 left-0 overflow-hidden">
        <div className="absolute top-0 left-7 rotate-45 scale-90">
          <Ellipse15 width="100%" color="#76D0FC" />
        </div>
        <div className="absolute bottom-[-5.5rem] left-[-4.5rem] rotate-90">
          <Star1 width="100%" height="310" />
        </div>
      </div>
      <div className="h-[32%] w-[15%]  absolute top-0 right-0 overflow-hidden">
        <div className="absolute top-10 left-0 rotate-[-90deg]">
          <Vector width="245" height="245" />
        </div>
      </div>
      <div className="absolute bottom-[6rem] right-[10rem]">
        <Ellipse14 />
      </div>
      <div className="absolute top-[6rem] left-[10rem]">
        <Ellipse16 />
      </div>

      <div
        className="cursor-pointer w-[40%] h-[40%] my-[5%] text-center pb-[24px] flex flex-col justify-center gap-[5rem]"
        onClick={() => {
          nav("/");
        }}
      >
        <p className="text-headline1 text-etc-black ">Page is not fond !</p>
        <p className="text-headline4">Go back to home page</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
