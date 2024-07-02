import { useContext } from "react";
import {
  IoFastFoodOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MyContext } from "../App";
import { GiChickenOven } from "react-icons/gi";

function Navigation() {
  const { showNavMenu, setShowNavMenu } = useContext(MyContext);

  function handleToggle(e) {
    if (e.target.closest("li")) setShowNavMenu(false);
  }
  return (
    <nav
      className={`lg:w-[10rem] h-svh  w-full fixed lg:static top-0 right-0 z-20 bg-stone-950 lg:bg-opacity-0 bg-opacity-[.92] flex  lg:items-start items-center transition-all justify-center ${
        showNavMenu ? "translate-x-[0%]" : "translate-x-[100%] lg:translate-x-0"
      }`}
    >
      <ul
        className=" flex flex-col  gap-10 text-2xl lg:text-lg lg:items-start justify-center lg:justify-start lg:pt-0 lg:text-inherit text-stone-300 "
        onClick={handleToggle}
      >
        <li>
          <NavLink
            to="/home"
            className="flex lg:gap-2 gap-4 items-center hover:text-yellow-600 transition-all "
          >
            <IoHomeOutline />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            className="flex lg:gap-2 gap-4  items-center hover:text-yellow-600 transition-all"
          >
            <GiChickenOven />
            <span>Menu</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/order"
            className="flex lg:gap-2 gap-4  items-center hover:text-yellow-600 transition-all"
          >
            <IoFastFoodOutline />
            <span>My Order</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="flex lg:gap-2 gap-4  items-center hover:text-yellow-600 transition-all"
          >
            <IoPeopleOutline />
            <span>About Us</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reviews"
            className="flex lg:gap-2 gap-4  items-center hover:text-yellow-600 transition-all"
          >
            <MdOutlineReviews />
            <span>Reviews</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
