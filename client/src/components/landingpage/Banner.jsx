import { ButtonPrimary } from "../systemdesign/Button";
import { Ellipse16, Star1, Ellipse17 } from "../systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";

export default function Banner() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-w-[1440px] p-20 flex flex-col">
      <div className="w-full h-[448px] bg-yellow-100 rounded-[16px] relative overflow-hidden">
        <div className="absolute right-[-25px] top-[-35px]">
          <Ellipse16 width="229" height="229" />
        </div>
        <div className="absolute bottom-[130px] left-[965px]">
          <Star1 width="191" height="186" />
        </div>
        <div className="absolute bottom-0">
          <Ellipse17 width="337" height="168" />
        </div>
        <div className="inline-flex flex-col justify-center items-center gap-10 w-[457px] h-[216px] mx-[411px] my-[116px]">
          <p className="text-headline1 text-etc-black text-center">
            Perfect Pet Sitter For Your Pet
          </p>
          <ButtonPrimary
            content="Find A Pet Sitter"
            width="120"
            onClick={() => {
              isAuthenticated ? navigate("/search") : navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}
