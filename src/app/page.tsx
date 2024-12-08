import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInButton from "../components/buttons/SignInButton";
import PositionsPage from "./positions/page";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      {session && session.jwt ? <PositionsPage /> : <SignInButton />}
    </div>
  );
};

export default Home;
