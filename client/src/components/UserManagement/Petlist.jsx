import { ButtonPrimary } from "../systemdesign/Button";
import YourPet from "./UserPetsList/YourPet";
import Footer from "../systemdesign/Footer";
import { useState } from "react";
import { CreatePet, EditPet } from "./UserPetsList/PetProfile";
import { ArrowLeftIcon, PetIcon } from "../systemdesign/Icons";

function Petlist() {
  const [showCreatePetButton, setShowCreatePetButton] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showYourPet, setShowYourPet] = useState(true);
  return (
    <>
      <div>
        <div className=" bg-etc-white w-full flex justify-between items-center pb-[60px]">
          {buttonClicked && !showCreatePetButton ? (
            <p className=" text-headline3 flex items-center gap-[10px]">
              {" "}
              <ArrowLeftIcon
                color="#7B7E8F"
                onClick={() => {
                  setButtonClicked(false);
                  setShowCreatePetButton(true);
                  setShowYourPet(true);
                }}
              />{" "}
              Your Pet
            </p>
          ) : (
            <p className=" text-headline3">Your Pet</p>
          )}

          {!buttonClicked && showCreatePetButton && (
            <ButtonPrimary
              content={"Create Pet"}
              onClick={() => {
                setButtonClicked(true); // ทำเครื่องหมายว่าปุ่มถูกคลิก
                setShowCreatePetButton(false); // ซ่อนปุ่ม
                setShowYourPet(false); // ซ่อน YourPet
              }}
            />
          )}
        </div>
        {showYourPet && <YourPet />}{" "}
        {/* เรนเดอร์ YourPet เฉพาะเมื่อ showYourPet เป็น true */}
        {buttonClicked && <EditPet />} {/* เรนเดอร์ Footer เมื่อปุ่มถูกคลิก */}
      </div>
    </>
  );
}

export default Petlist;
