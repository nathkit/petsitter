import frame1 from "../../assets/SitterReview/frame427320941.png";
import frame2 from "../../assets/SitterReview/frame427320942.png";
import frame3 from "../../assets/SitterReview/frame427320943.png";
import cat from "../../assets/SitterReview/lovely-pet-portrait-isolated-1.png";
import { Star1 } from "../systemdesign/image";

export default function ShowCase() {
  return (
    <div className="w-full p-20 flex flex-col items-center mx-auto">
      <p className="mb-[120px]">
        "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
      </p>
      <div className="flex mb-[120px]">
        <div>
          <div>
            <Star1 color="#76D0FC" width="24px" height="24px" />
            <p>Boarding</p>
            <p>
              Your pets stay overnight in your sitter’s home. They’ll be treated
              like part of the family in a comfortable environment.
            </p>
          </div>
          <div>
            <Star1 color="#FA8AC0" width="24px" height="24px" />
            <p>House Sitting</p>
            <p>
              Your sitter takes care of your pets and your home. Your pets will
              get all the attention they need without leaving home.
            </p>
          </div>
          <div>
            <Star1 color="#1CCD83" width="24px" height="24px" />
            <p>Dog Walking</p>
            <p>
              Your dog gets a walk around your neighborhood. Perfect for busy
              days and dogs with extra energy to burn.
            </p>
          </div>
          <div>
            <Star1 color="#FFCA62" width="24px" height="24px" />
            <p>Drop-In Visits</p>
            <p>
              Your sitter drops by your home to play with your pets, offer food,
              and give potty breaks or clean the litter box.
            </p>
          </div>
        </div>
        <div className="w-[455px] h-[601px]">
          <img src={cat} alt="cat show cate" className="max-w-fit" />
        </div>
      </div>
      <div className="flex">
        <div className="w-[416px] px-6 text-center">
          <div className="w-[268px] h-[268px] mb-[46px] mx-auto">
            <img src={frame1} alt="cat with sitter" className="max-w-fit" />
          </div>
          <p className="text-headline3 text-etc-black mb-3">
            <span className="text-green-500">Connect</span> With Sitters
          </p>
          <p className="text-body1 text-gray-500">
            Find a verified and reviewed sitter who’ll keep your pets company
            and give time.
          </p>
        </div>
        <div className="w-[416px] px-6 text-center">
          <div className="w-[268px] h-[268px] mb-[46px] mx-auto">
            <img src={frame2} alt="dog and cat" className="max-w-fit" />
          </div>
          <p className="text-headline3 text-etc-black mb-3">
            <span className="text-blue-500">Better</span> For Your Pets
          </p>
          <p className="text-body1 text-gray-500">
            Pets stay happy at home with a sitter who gives them loving care and
            companionship.
          </p>
        </div>
        <div className="w-[416px] px-6 text-center">
          <div className="w-[268px] h-[268px] mb-[46px] mx-auto">
            <img src={frame3} alt="dog with sitter" className="max-w-fit" />
          </div>
          <p className="text-headline3 text-etc-black mb-3">
            <span className="text-orange-500">Calling</span> All Pets
          </p>
          <p className="text-body1 text-gray-500">
            Stay for free with adorable animals in unique homes around the
            world.
          </p>
        </div>
      </div>
    </div>
  );
}
