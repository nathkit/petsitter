import { ButtonSecondary } from "../../systemdesign/Button";
import { StarIcon } from "../../systemdesign/Icons";

function YourReviewButton() {
  return (
    <div>
      <ButtonSecondary
        className="btn"
        onClick={(e) => {
          document.getElementById("my_modal_2").showModal();
        }}
        content="Your Review"
      />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[603px] font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
          <div className="flex px-10 py-6 h-[80px]">
            <h3>Your Rating and Review</h3>
          </div>
          <hr />
          <div className="flex flex-col gap-20 p-10 h-[520px]">
            <div className="h-[312px] flex flex-col gap-4">
              <div className="flex h-[128px] px-6 pt-6 pb-10">
                <div className="flex w-[220px] h-[56px] font-medium gap-4">
                  <img
                    src="./src/assets/img/Johnwick.png"
                    alt="Johnwick"
                    className="rounded-full"
                    width={56}
                    height={56}
                  />
                  <div>
                    <div className="text-[18px] text-[#000]">John Wick</div>
                    <div className="text-[14px] text-gray-400">
                      Tue, 13 Apr 2023
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: 5 }, (_, index) => (
                      <StarIcon key={index} color="#1CCD83" />
                    ))}
                  </div>
                  <div className="text-[16px] text-gray-500">
                    Thanks for I Som.
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <form method="dialog" className="flex justify-center">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <ButtonSecondary
                className="btn"
                content="View Pet Sitter"
                width="157px"
              />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default YourReviewButton;
