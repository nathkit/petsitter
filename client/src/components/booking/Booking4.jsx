import { ButtonPrimary, ButtonSecondary } from "../systemdesign/Button";
import catPaw from "../../assets/img/catPaw.png";
import starCat from "../../assets/img/starCat.png";
import { useNavigate } from "react-router-dom";

function Booking4() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col items-center  bg-etc-bg_gray relative h-screen">
      <div className=" absolute top-[0px] left-[16px]">
        <img src={catPaw} />
      </div>
      <div className="w-[632px]  bg-etc-white">
        <div className=" bg-etc-black text-etc-white text-center p-6 rounded-t-2xl ">
          <p className="mb-2 text-headline2">Thank You For Booking</p>
          <p className=" text-body2">
            We will send your booking information to Pet Sitter.
          </p>
        </div>
        <div className="">
          <div className="px-10 pt-10">
            <div className="pb-6 text-body2 text-gray-300 ">
              <p className="">Transaction Date: Tue, 16 Oct 2022</p>
              <p className="">Transaction No. : 122312</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Pet Sitter:</p>
              <p className="text-body2">Happy House! By Jane Maison</p>
            </div>
            <div className="pb-6 flex ">
              <div className="mr-20">
                <p className="text-gray-400 text-body3">Date & Time:</p>
                <div>
                  <span className="mr-3 text-body2">25 Aug, 2023</span>|
                  <span className="ml-3 text-body2">7 AM - 10 AM</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-body3">Duration:</p>
                <p className="text-body2">3 hours</p>
              </div>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Pet</p>
              <p className="text-body2">Bubba, Daisy</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Additional Message </p>
              <p className="text-body2">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-10 pb-10 mt-4 bg-etc-white rounded-b-2xl">
            <p className="text-body2">Total</p>
            <p className="text-body1">600.00 THB</p>
          </div>
        </div>
      </div>
      <div className="mt-10 relative">
        <ButtonSecondary content={"Booking History"} width={"159px"} />
        &nbsp;&nbsp;
        <ButtonPrimary
          content={"Back To Home"}
          width={"156px"}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className=" absolute right-0  bottom-0 ">
        <img src={starCat} />
      </div>
    </div>
  );
}

export default Booking4;
