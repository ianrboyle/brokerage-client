import Link from "next/link";
import SignInButton from "./buttons/SignInButton";
import PositionsButton from "./buttons/PositionsButton";
import paths from "../paths";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div className="w-full absolute text-white z-10">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Typography color="text.secondary">
          <Link href={paths.home()} className="font-bond text-3xl">
            Home
          </Link>
        </Typography>

        <div className="space-x-4 text-xl">
          <SignInButton />
          <PositionsButton />
        </div>
      </nav>
    </div>
  );
};

export default Header;
