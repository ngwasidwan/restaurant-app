import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";

import { RES_PER_PAGE } from "../services/constants";
import { useSearchParams } from "react-router-dom";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

let SLICE_START = 0;
let SLICE_END = 4;

function MenuPage({ data }) {
  const [activeItem, setActiveItem] = useState(1);
  const { setItemData } = useContext(MyContext);

  useEffect(() => {
    if (data?.length) setItemData(data[activeItem - 1]);
  }, [data, activeItem, setItemData]);

  function getSingleItem(id) {
    const [newData] = data.filter((el) => el.id === id);

    setItemData(newData);
    setActiveItem(id);
  }

  const size = data?.length;
  const num_pages = Math.ceil(size / RES_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");

  //next page
  function nextPage() {
    const next = currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);

    SLICE_START = currentPage * RES_PER_PAGE;
    SLICE_END = RES_PER_PAGE * (currentPage + 1);
  }

  //previous page
  function previousPage() {
    const prev = currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);

    SLICE_START = -size + (prev - 1) * RES_PER_PAGE;
    SLICE_END = SLICE_START + RES_PER_PAGE;
  }

  return (
    <div className=" relative md:h-[75vh] row-start-2 col-span-full md:row-start-1 md:col-span-1 ">
      {data.slice(SLICE_START, SLICE_END).map((item) => {
        return (
          <div
            key={item.id}
            className={`flex gap-4 sm:gap-2 w-4/5 md:mx-0 mx-auto items-center border-2 border-yellow-200 hover:border-yellow-500 mb-6 rounded-md  transition hover:scale-105  ease-in duration-300 cursor-pointer ${
              item.id === activeItem &&
              "border-yellow-500 scale-105 shadow-sm shadow-yellow-300"
            }`}
            onClick={() => getSingleItem(item.id)}
          >
            <img
              src={item.image}
              alt="food image"
              className=" object-cover w-[8rem] md:w-[5rem]sm:h-[5rem] h-[6rem]"
            />

            <div className=" md:h-auto h-[60px] ">
              <h3 className=" font-semibold mb-1 md:mb-[2px] lg:mb-1  text-base md:text-sm lg:text-base ">
                {item.meal}
              </h3>
              <span className="italic text-base md:text-sm lg:text-base">
                price: <strong>{item.price} </strong> FCFA
              </span>
            </div>
          </div>
        );
      })}

      {/* pagination */}
      <div className="grid grid-cols-2 md:gap-10 gap-5 absolute bottom-[-1rem] md:bottom-[-3rem] lg:bottom-[-4.5rem] place-items-center ml-2 md:ml-2 items-center  ">
        <p className="text-sm ml-10 md:ml-0">
          {" "}
          results {1 + (currentPage - 1) * RES_PER_PAGE} to{" "}
          {currentPage == num_pages ? size : RES_PER_PAGE * currentPage} of{" "}
          {size}
        </p>{" "}
        <div className="flex md:gap-10 gap-5 ml-auto ">
          <button
            className={`flex items-center  hover:text-yellow-500 transition-all ${
              currentPage === 1 && "cursor-not-allowed opacity-40"
            }`}
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            <BiSolidChevronLeft className="text-2xl " />
            <span className="text-sm ">PREVIOUS</span>
          </button>

          <button
            className={`flex items-center    hover:text-yellow-500 transition-all ${
              currentPage === num_pages && " opacity-40 cursor-not-allowed"
            }`}
            onClick={nextPage}
            disabled={currentPage === num_pages}
          >
            <span className="text-sm ">NEXT</span>

            <BiSolidChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
