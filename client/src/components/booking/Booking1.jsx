import { useState } from "react";
import { CardPet2 } from "../systemdesign/CardPet";
import { BaseCheckbox } from "../systemdesign/BaseCheckbox";

function booking1({ setDisableButtonBooking1 }) {
  const [selectedButtons, setSelectedButtons] = useState([]); // ปุ่มที่ถูกเลือก

  const handleCheckboxChange = (index) => {
    let updatedSelectedButtons = [...selectedButtons];

    // ตรวจสอบว่าปุ่มที่ถูกเลือกมีอยู่แล้วหรือไม่
    if (updatedSelectedButtons.includes(index)) {
      // ถ้ามีอยู่แล้วให้ลบออกจาก selectedButtons
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (selectedIndex) => selectedIndex !== index
      );
    } else {
      // ถ้ายังไม่มีให้เพิ่ม index เข้าไปใน selectedButtons
      updatedSelectedButtons.push(index);
    }

    setSelectedButtons(updatedSelectedButtons);
    // อัปเดตสถานะของปุ่มที่ถูกเลือก
    setDisableButtonBooking1(updatedSelectedButtons);
    // console.log(updatedSelectedButtons);
  };

  return (
    <>
      <CardPet2 selectedButtons={selectedButtons}>
        {(index) => (
          <div className=" absolute top-3 right-3 hover:border-orange-300 border-gray-200">
            <BaseCheckbox
              onChanged={() => {
                handleCheckboxChange(index);
              }}
              isChecked={selectedButtons.includes(index)}
            />
          </div>
        )}
      </CardPet2>
    </>
  );
}

export default booking1;
