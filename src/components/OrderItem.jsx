import { IoEllipsisVertical } from "react-icons/io5";
import DropdownMenu from "./DropdownMenu";
import {  useEffect } from "react";
import { useMyContext } from "../services/useMyContext";


const PRICE_PER_DRINK = 1000;
const style = {
  display: "grid",
  gridTemplateColumns: "1.8fr .6fr 1fr 1fr .6fr  1fr .8fr .2fr",
  alignItems: "center",
  justifyItems: "center",
  marginBottom: "1.5rem",
};

function OrderItem({ order }) {
  const { showMenu, setShowMenu } = useMyContext()

  // implementing body click to close dropdown menu
  useEffect(() => {
    function handleClick(e) {
      if (e.target.closest("#icon")) return;
      setShowMenu(null);
    }

    document.body.addEventListener("click", handleClick, true);
    return () => document.body.removeEventListener("click", handleClick, true);
  }, [setShowMenu]);

  const { meal, price, numPlates, numBottles, drinks, id } = order;
  function menuClick() {
    setShowMenu(id === showMenu ? null : id);
  }

  return (
    <>
      <ul style={style} className="bg-yellow-400 p-2 relative">
        <li className="md:text-lg text-[12px]">{meal}</li>
        <li className="md:text-lg text-[12px]">{price}</li>
        <li className="md:text-lg text-[12px]">{numPlates}</li>
        <li className="md:text-lg text-[12px]">{drinks ? drinks : "-"}</li>
        <li className="md:text-lg text-[12px]">
          {drinks ? PRICE_PER_DRINK : "-"}
        </li>

        <li className="md:text-lg text-[12px]">
          {numBottles ? numBottles : "-"}
        </li>
        <li className="md:text-lg text-[12px]">
          {drinks
            ? price * numPlates + PRICE_PER_DRINK * numBottles
            : price * numPlates}
        </li>

        <div id="icon">
          <IoEllipsisVertical
            role="button"
            onClick={menuClick}
            className={`text-sm md:text-lg  ${
              showMenu === id && "border-yellow-500 border-2 rounded-sm "
            }`}
          />
          {showMenu === id && <DropdownMenu order={order} />}
        </div>
      </ul>{" "}
    </>
  );
}

export default OrderItem;
