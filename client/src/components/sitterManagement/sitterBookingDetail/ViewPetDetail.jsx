import { useEffect, useState } from "react";
import {
  DogType,
  CatType,
  BirdType,
  RabbitType,
} from "../../systemdesign/PetType";
import axios from "axios";

function ViewPetDetail({ petId, userId }) {
  const [pets, setPets] = useState({});

  const getPets = async () => {
    const result = await axios.get(`/userManagement/${userId}/pets/${petId}`);
    // console.log(result.data.data);
    setPets(result.data.data);
  };

  useEffect(() => {
    if (userId && petId) {
      getPets();
    }
  }, [userId, petId]);

  return (
    <div
      className="flex flex-col justify-center items-center w-[207px] h-[236px] p-6 gap-4 border-solid border-[1px] rounded-[16px] 
    hover:border-[#FF7037] hover:shadow-xl hover:cursor-pointer"
      onClick={(e) => {
        document.getElementById(pets.name).showModal();
      }}
    >
      <img
        src={pets.image_path ? pets.image_path : null}
        alt={pets.name}
        style={{
          width: "104px",
          height: "104px",
        }}
        className="rounded-full object-cover"
      />

      <div className="flex flex-col items-center gap-2 text-[20px] text-[#3A3B46] font-bold">
        <div>{pets.name}</div>
        <div>
          {pets.pet_type_id === 1 && <DogType />}
          {pets.pet_type_id === 2 && <CatType />}
          {pets.pet_type_id === 3 && <BirdType />}
          {pets.pet_type_id === 4 && <RabbitType />}
        </div>
      </div>
      <dialog id={pets.name} className="modal">
        <div className="modal-box  max-w-[800px] h-auto p-0 bg-etc-white">
          <div className="w-full px-10 py-6 h-[80px] text-[#000] text-[20px] font-bold">
            {pets.name}
          </div>
          <hr />
          <div className=" w-full p-10 flex flex-row items-start gap-10">
            <div className=" flex flex-col justify-center gap-4 rounded-lg">
              <div className=" avatar">
                <div className=" w-[240px] h-[240px] bg-etc-bg_gray rounded-full">
                  <img src={pets.image_path} alt={pets.name} />
                </div>
              </div>
              <h4 className=" w-full text-center text-headline4 text-etc-black ">
                {pets.name}
              </h4>
            </div>
            <div className="flex flex-col w-[440px] h-full p-[24px] bg-etc-bg_gray rounded-lg gap-10">
              <div className="flex gap-10">
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">
                    Pet Type
                  </p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.pet_type_id === 1 && "Dog"}
                    {pets.pet_type_id === 2 && "Cat"}
                    {pets.pet_type_id === 3 && "Bird"}
                    {pets.pet_type_id === 4 && "Rabbit"}
                  </p>
                </div>
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">Breed</p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.breed ? pets.breed : "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">Sex</p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.sex ? pets.sex : "-"}
                  </p>
                </div>
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">Age</p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.age ? pets.age : "-"} Month
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">Color</p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.color ? pets.color : "-"}
                  </p>
                </div>
                <div className="flex flex-col w-[176px]">
                  <p className="text-[#AEB1C3] text-[20px] font-bold">Weight</p>
                  <p className="text-[#000] text-[16px] font-[400px]">
                    {pets.weight ? pets.weight : "-"} Kilogram
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-[#AEB1C3] text-[20px] font-bold">About</p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {pets.description ? pets.description.substring(0, 150) : "-"}
                </p>
              </div>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default ViewPetDetail;
