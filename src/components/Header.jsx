import { MdMenu } from "react-icons/md";

import { BiX } from "react-icons/bi";
import Logo from "./Logo";
import { useMyContext } from "../services/useMyContext";

const style = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
};
function Header() {
  const { showNavMenu, setShowNavMenu } = useMyContext();
  return (
    <div className=" bg-yellow-500  py-2 relative ">
      {/* <div className="w-2/3  flex items-center lg:mx-0 mx-auto "> */}
      <div style={style} className="  items-center lg:mx-0 mx-auto ">
        <Logo />
        <h1 className="md:text-2xl md:font-bold text-center uppercase text-sm font-semibold ml-auto  px-2 min-w-60 md:w-[400px]">
          Queen Mother&apos; s cuisine
        </h1>

        <div
          className={`lg:hidden text-3xl z-30 ${
            showNavMenu && "text-yellow-500"
          }`}
          onClick={() => setShowNavMenu((show) => !show)}
        >
          {showNavMenu ? (
            <BiX className="place-self-end " />
          ) : (
            <MdMenu className="place-self-end " />
          )}
        </div>
      </div>
      {/* <div
        className={`lg:hidden mr-5 md:ml-24 text-3xl absolute z-30 right-0 top-4 md:top-11 ${
          showNavMenu && "text-yellow-500"
        }`}
        onClick={() => setShowNavMenu((show) => !show)}
      >
        {showNavMenu ? <BiX /> : <MdMenu />}
      </div> */}
    </div>
  );
}

export default Header;
