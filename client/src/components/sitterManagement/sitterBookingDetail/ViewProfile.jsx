import { useEffect, useState } from "react";
import { ButtonViewProfile } from "../../systemdesign/Button";
import axios from "axios";
import { Close } from "../../systemdesign/Icons";
import { dateWithOutComma } from "../../../utils/timeFormat";
import { StarIcon } from "../../systemdesign/Icons";

function ViewProfile({ userId }) {
  const [users, setUsers] = useState({});

  const getUser = async () => {
    const result = await axios.get(`/userManagement/${userId}`);
    // console.log(result.data.data);
    setUsers(result.data.data);
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [users,userId]);

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
        <div className="modal-box max-w-[800px] h-auto p-0 bg-etc-white">
          <form method="dialog">
            <div className=" flex flex-row-reverse justify-between items-center w-full px-10 py-6">
              <button className="btn btn-ghost">
                <Close fill="#3A3B46" />
              </button>
              <h3 className=" text-headline3 h-fit text-gray-600 ">
                {users.full_name}
              </h3>
            </div>
          </form>

          <hr className=" w-full " />
          <section className=" w-full p-10 flex flex-row items-start gap-10">
            <div className=" flex flex-col justify-center gap-4">
              <div className=" avatar">
                <div className=" w-[240px] h-[240px] bg-etc-bg_gray rounded-full">
                  <img src={users.profile_image_path} alt={users.full_name} />
                </div>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2">
                <h4 className=" text-headline4 text-etc-black">User Ratings</h4>
                <div className=" flex flex-col items-center gap-2">
                  <div className="flex gap-[2px]">
                    {users.average_rating !== null ? (
                      <>
                        {Array.from(
                          { length: users.average_rating },
                          (_, index) => (
                            <StarIcon key={index} color="#1CCD83" />
                          )
                        )}
                      </>
                    ) : (
                      <p>No review</p>
                    )}
                  </div>
                  <div>
                    {users.ratings !== null && users.ratings !== undefined ? (
                      <>
                        <p className="text-body2 text-gray-300">
                          {(() => {
                            const ratingArray = users.ratings.split(",");
                            const nonZeroRatings = ratingArray.filter(
                              (rating) => parseFloat(rating) !== 0
                            );
                            const ratingCount = nonZeroRatings.length;
                            return (
                              <>
                                {ratingCount}
                                <span className="m-1">
                                  {ratingCount === 1
                                    ? "sitter review"
                                    : "sitter reviews"}
                                </span>
                              </>
                            );
                          })()}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col w-full h-auto gap-10 bg-etc-bg_gray p-6 rounded-lg">
              <div className=" flex flex-row gap-10 w-full h-auto">
                <div className=" space-y-1 w-full h-auto ">
                  <h4 className=" text-headline4 text-gray-300">
                    Pet Owner Name
                  </h4>
                  <h4 className=" text-body2 text-etc-black">
                    {users.full_name}
                  </h4>
                </div>
              </div>
              <div className=" flex flex-row gap-10 w-full h-auto">
                <div className=" space-y-1 w-full h-auto ">
                  <h4 className=" text-headline4 text-gray-300">Email</h4>
                  <h4 className=" text-body2 text-etc-black">{users.email}</h4>
                </div>
              </div>
              <div className=" flex flex-row gap-10 w-full h-auto">
                <div className=" space-y-1 w-full h-auto ">
                  <h4 className=" text-headline4 text-gray-300">Phone</h4>
                  <h4 className=" text-body2 text-etc-black">{users.phone}</h4>
                </div>
              </div>
              <div className=" flex flex-row gap-10 w-full h-auto">
                <div className=" space-y-1 w-full h-auto ">
                  <h4 className=" text-headline4 text-gray-300">ID Number</h4>
                  <h4 className=" text-body2 text-etc-black">
                    {users.id_number}
                  </h4>
                </div>
              </div>
              <div className=" flex flex-row gap-10 w-full h-auto">
                <div className=" space-y-1 w-full h-auto ">
                  <h4 className=" text-headline4 text-gray-300">
                    Date of Birth
                  </h4>
                  <h4 className=" text-body2 text-etc-black">
                    {dateWithOutComma(users.date_of_birth)}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </dialog>
    </div>
  );
}

export default ViewProfile;
