import { SitterIconWhite } from "./Icons";

export default function Footer() {
  return (
    <div className="w-full bg-etc-black p-20 flex flex-col items-center gap-6">
      <SitterIconWhite width="210" height="64" />
      <p className="text-headline3 text-etc-white">
        Find your perfect pet sitter with us.
      </p>
    </div>
  );
}
