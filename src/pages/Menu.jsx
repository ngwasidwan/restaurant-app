// import { useContext } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";

import OrderForm from "../components/OrderForm";
import Spinner from "../components/Spinner";
import { getMenuData } from "../services/apiMenu";

import Error from "../components/Error";
// import { MyContext } from "../App";
import Description from "../components/Description";
import MenuPage from "../components/MenuPage";
import { useMyContext } from "../services/useMyContext";

const style = {
  display: "grid",
  gridTemplateColumns: ".8fr 1fr",
  gap: "1rem",
};

function Menu() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenuData,
  });

  console.log(isFetching);
  const { itemData, openForm } = useMyContext();

  //next page

  if (isLoading && !isFetching)
    return (
      <Error>
        Unable to connect to our servers. Check your internet connection
      </Error>
    );
  if (isLoading) return <Spinner />;
  if (isError) return <Error>{error.message}</Error>;
  return (
    <>
      {openForm &&
        createPortal(<OrderForm itemData={itemData} />, document.body)}
      <div style={style} className="p-2 ">
        <MenuPage data={data} />

        <Description />
      </div>{" "}
    </>
  );
}

export default Menu;
