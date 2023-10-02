import { useState } from "react";
import { CardPet2 } from "../systemdesign/CardPet";
import { BaseCheckbox } from "../systemdesign/BaseCheckbox";
import { useBooking } from "../../contexts/BookingContext";
import { format, parseISO } from "date-fns";

function booking1({ setDisableButtonBooking1 }) {
  const [selectedButtons, setSelectedButtons] = useState([]); // ปุ่มที่ถูกเลือก
  const {
    petIds,
    setPetIds,
    petIdsNames,
    setPetIdsNames,
    setTotalAmount,
    duration,
  } = useBooking();

  const handleCheckboxChange = (index, petId, petName) => {
    let updatedSelectedButtons = [...selectedButtons];
    let updatedPetIds = [...petIds]; // คัดลอก array petId
    // Create an object to store the mapping of petId to petName
    let updatedPets = { ...petIdsNames };

    // ตรวจสอบว่าปุ่มที่ถูกเลือกมีอยู่แล้วหรือไม่
    if (updatedSelectedButtons.includes(index)) {
      // ถ้ามีอยู่แล้วให้ลบออกจาก selectedButtons
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (selectedIndex) => selectedIndex !== index
      );
      // ลบ petId ที่เกี่ยวข้องออกจาก petId
      updatedPetIds = updatedPetIds.filter((id) => id !== petId);

      // Remove the petId from the Mapping object
      delete updatedPets[petId];
    } else {
      // ถ้ายังไม่มีให้เพิ่ม index เข้าไปใน selectedButtons
      updatedSelectedButtons.push(index);
      // เพิ่ม petId เข้าไปใน petId
      updatedPetIds.push(petId);
      // Add the petId and petName to the mapping object
      updatedPets[petId] = petName;
    }

    setSelectedButtons(updatedSelectedButtons);
    // อัปเดตสถานะของปุ่มที่ถูกเลือก
    setDisableButtonBooking1(updatedSelectedButtons);
    // console.log(updatedSelectedButtons);
    setPetIds(updatedPetIds); // อัปเดต petId
    setPetIdsNames(updatedPets);

    const numberOfPets = Object.keys(updatedPets).length;
    console.log(numberOfPets);
    let totalAmount = 0;

    if (numberOfPets > 1) {
      totalAmount = 100 * (numberOfPets - 1) * duration + 200 * duration;
    } else {
      totalAmount = duration * numberOfPets * 200;
    }
    setTotalAmount(totalAmount);
  };

  return (
    <>
      <CardPet2 selectedButtons={selectedButtons}>
        {(index, isInvalidType, petId, petName) => (
          <div className=" absolute top-3 right-3 hover:border-orange-300 border-gray-200">
            {!isInvalidType && (
              <BaseCheckbox
                onChanged={() => {
                  handleCheckboxChange(index, petId, petName);
                }}
                isChecked={selectedButtons.includes(index)}
                onCl
              />
            )}{" "}
          </div>
        )}
      </CardPet2>
    </>
  );
}

export default booking1;
