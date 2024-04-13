import Link from "next/link";
import SignInButton from "./SignInButton";
import PositionsButton from "./PositionsButton";
import paths from "../paths";

const Header = () => {
  return (
    <div className="w-full absolute text-white z-10">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href={paths.home()} className="font-bond text-3xl">
          Home
        </Link>
        <div className="space-x-4 text-xl">
          <SignInButton />
          <PositionsButton />
        </div>
      </nav>
    </div>
  );
};

export default Header;
