import { ButtonPrimary, ButtonSecondary } from "../systemdesign/Button";

function YourReviewButton() {
  return (
    <div>
      <ButtonPrimary
        className="btn"
        onClick={(e) => {
          document.getElementById("my_modal_3").showModal();
        }}
        content="Your Review"
      />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[600px] font-bold text-[24px] text-gray-600 px-10 pt-[24px] pb-10">
          <div className="flex">
            <h3>Your Rating and Review</h3>
          </div>
          <div className="flex flex-col gap-20 pt-[64px]">
            <div className="h-[312px]"></div>
            <form method="dialog">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="flex justify-between">
                <ButtonSecondary
                  className="btn"
                  content="View Pet Sitter"
                  width="157px"
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default YourReviewButton;
