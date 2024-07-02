import { useContext } from "react";
import { MyContext } from "../App";

export function useMyContext() {
  return useContext(MyContext);
}
