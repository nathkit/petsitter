import { SitterIconBlack } from "./Icons";
import { ButtonPrimary } from "./Button";

export default function Navbar() {
  return (
    <div className="min-w-[1440px] h-20 px-20 flex justify-between items-center flex-shrink-0">
      <div>
        <SitterIconBlack width="131" height="40" />
      </div>
      <div className="flex items-center gap-4">
        <div className="px-6 py-4 text-body1 text-etc-black">Login</div>
        <div>
          <ButtonPrimary content="Find A Pet Sitter" width="168px" />
        </div>
      </div>
    </div>
  );
}
