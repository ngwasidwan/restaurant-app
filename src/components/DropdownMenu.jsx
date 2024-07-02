import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { useMyContext } from "../services/useMyContext";

function DropdownMenu({ order }) {
  const { setOpenForm, setItemData, setCanEdit, setShowMenu, setOpenModal } =
    useMyContext();

  function handleEdit() {
    setItemData(order);
    setOpenForm(true);
    setCanEdit(true);
    setShowMenu(null);
  }
  function handleDelete() {
    setOpenModal(true);
    setShowMenu(null);
    setItemData(order);
  }
  return (
    <p className="absolute  bg-yellow-50 p-2 z-10 right-8 bottom-[-4rem] shadow-sm shadow-stone-200">
      <span
        className="flex items-center text-base gap-2 mb-4 cursor-pointer hover:border-yellow-500 border-2 border-yellow-50 px-1"
        onClick={handleEdit}
      >
        <IoPencil />
        <span>Edit</span>
      </span>
      <span
        className="flex items-center text-base gap-2 cursor-pointer  hover:border-yellow-500 border-2 border-yellow-50 px-1"
        onClick={handleDelete}
      >
        <IoTrashOutline />
        <span>Delete</span>
      </span>
    </p>
  );
}

export default DropdownMenu;
