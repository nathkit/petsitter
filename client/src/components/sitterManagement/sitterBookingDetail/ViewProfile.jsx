import { useEffect, useState } from "react";
import { ButtonViewProfile } from "../../systemdesign/Button";
import axios from "axios";
import { dateTimeFormat } from "../../../utils/timeFormat";

function ViewProfile({ userId }) {
  const [users, setUsers] = useState({});

  const getUser = async () => {
    const result = await axios.get(`/userManagement/${userId}`);
    console.log(result.data.data);
    setUsers(result.data.data);
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <div className="flex">
      <ButtonViewProfile
        content="View Profile"
        width="121px"
        height="32px"
        onClick={(e) => {
          document.getElementById(users.full_name).showModal();
        }}
      />
      <dialog id={users.full_name} className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[650px] p-0">
          <div className="w-full px-10 py-6 h-[80px] text-[#000] text-[20px] font-bold">
            {users.full_name}
          </div>
          <hr />
          <div className="flex w-full h-[568px] p-10 gap-10 rounded-[8px]">
            <div className="flex flex-col items-center gap-4 text-[20px] text-[#000] font-bold">
              <img
                src={users.profile_image_path}
                alt={users.full_name}
                style={{
                  width: "240px",
                  height: "240px",
                }}
                className="rounded-full"
              />
              <p>{users.full_name}</p>
            </div>
            <div className="flex flex-col w-[440px] h-full p-[24px] bg-[#FAFAFB] gap-10">
              <div className="flex flex-col w-[176px]">
                <p className="text-[#AEB1C3] text-[20px] font-bold">
                  Pet Owner Name
                </p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {users.full_name}
                </p>
              </div>

              <div className="flex flex-col w-[176px]">
                <p className="text-[#AEB1C3] text-[20px] font-bold">Email</p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {users.email}
                </p>
              </div>

              <div className="flex flex-col w-[176px]">
                <p className="text-[#AEB1C3] text-[20px] font-bold">Phone</p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {users.phone}
                </p>
              </div>

              <div className="flex flex-col w-[176px]">
                <p className="text-[#AEB1C3] text-[20px] font-bold">
                  ID Number
                </p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {users.id_number}
                </p>
              </div>

              <div className="flex flex-col w-[176px]">
                <p className="text-[#AEB1C3] text-[20px] font-bold">
                  Date of Birth
                </p>
                <p className="text-[#000] text-[16px] font-[400px]">
                  {dateTimeFormat(users.date_of_birth)}
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

export default ViewProfile;
