import { useState } from "react";
import { CardPet2 } from "../systemdesign/CardPet";
import { BaseCheckbox } from "../systemdesign/BaseCheckbox";
import { useBooking } from "../../contexts/BookingContext";
function booking1({ setDisableButtonBooking1 }) {
  const [selectedButtons, setSelectedButtons] = useState([]); // ปุ่มที่ถูกเลือก
  const { petIds, setPetIds } = useBooking();

  const handleCheckboxChange = (index, petId) => {
    let updatedSelectedButtons = [...selectedButtons];
    let updatedPetIds = [...petIds]; // คัดลอก array petId
    // ตรวจสอบว่าปุ่มที่ถูกเลือกมีอยู่แล้วหรือไม่
    if (updatedSelectedButtons.includes(index)) {
      // ถ้ามีอยู่แล้วให้ลบออกจาก selectedButtons
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (selectedIndex) => selectedIndex !== index
      );
      // ลบ petId ที่เกี่ยวข้องออกจาก petId
      updatedPetIds = updatedPetIds.filter((id) => id !== petId);
    } else {
      // ถ้ายังไม่มีให้เพิ่ม index เข้าไปใน selectedButtons
      updatedSelectedButtons.push(index);
      // เพิ่ม petId เข้าไปใน petId
      updatedPetIds.push(petId);
    }

    setSelectedButtons(updatedSelectedButtons);
    // อัปเดตสถานะของปุ่มที่ถูกเลือก
    setDisableButtonBooking1(updatedSelectedButtons);
    // console.log(updatedSelectedButtons);
    setPetIds(updatedPetIds); // อัปเดต petId
  };
  // console.log(petIds);

  return (
    <>
      <CardPet2 selectedButtons={selectedButtons}>
        {(index, isInvalidType, petId) => (
          <div className=" absolute top-3 right-3 hover:border-orange-300 border-gray-200">
            {!isInvalidType && (
              <BaseCheckbox
                onChanged={() => {
                  handleCheckboxChange(index, petId);
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
