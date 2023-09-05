import { ButtonPrimary, ButtonSecondary } from "../systemdesign/Button";
import { Ellipse17, Vector, Star1, Ellipse14 } from "../systemdesign/image";

function Booking4() {
  return (
    <div className="flex justify-center flex-col items-center  bg-etc-bg_gray relative h-screen">
      <div className=" absolute top-[55px] left-[16px]">
        <Ellipse17 color={"#1ccd83"} width={"229px"} height={"114.5px"} />
        <div className="mt-[26.5px] ml-[135px]">
          <Vector width={"136px"} height={"141px"} />
        </div>
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
        <ButtonPrimary content={"Back To Home"} width={"156px"} />
      </div>
      <div className=" absolute right-0  bottom-20 ">
        <Star1 color={"#76d0fc"} width={"159px"} height={"155px"} />
        <div className="rotate-45">
          <Ellipse14 color={"#ffca62"} width={"253px"} height={"253px"} />
        </div>
      </div>
    </div>
  );
}

export default Booking4;
