import { ButtonPrimary } from "../systemdesign/Button";
import YourPet from "./UserPetsList/YourPet";
import Footer from "../systemdesign/Footer";
import { useState } from "react";
import CreatePet from "./UserPetsList/PetProfile";

function Petlist() {
  const [showCreatePetButton, setShowCreatePetButton] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showYourPet, setShowYourPet] = useState(true);
  return (
    <>
      <div>
        <div className=" bg-etc-white w-full flex justify-between items-center pb-[60px]">
          <p className=" text-headline3">Your Pet</p>
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
        {buttonClicked && <CreatePet />}{" "}
        {/* เรนเดอร์ Footer เมื่อปุ่มถูกคลิก */}
      </div>
    </>
  );
}

export default Petlist;
