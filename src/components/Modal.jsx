
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../services/apiOrder";
import toast from "react-hot-toast";
import SmallSpinner from "./SmallSpinner";
import { useMyContext } from "../services/useMyContext";


function Modal({ deleteId }) {
  const queryClient = useQueryClient();
  const { setOpenModal } = useMyContext()
  const { mutate: deleteItem, isLoading: isDeleting } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setOpenModal(false);
    },
    onError: (error) =>
      toast.error(error.message, " there was an error deleting order"),
  });

  function handleDeleteItem() {
    deleteItem(deleteId);
  }
  return (
    <section className="w-full flex items-center h-[80vh] justify-center bg-white absolute z-10 left-0">
      <div className=" flex flex-col items-center  gap-5 font-semibold  bg-stone-100 p-10">
        <p>
          Are you sure you want to delete this order? This action cannot be
          reversed.
        </p>
        <div className="w-40rem flex items-center">
          <button
            className="bg-yellow-500 uppercase px-2 py-1 font-semibold  border-2 border-yellow-500 hover:bg-yellow-50 transition-all w-20 h-[2.5rem]"
            onClick={() => setOpenModal(false)}
          >
            No
          </button>
          <button
            className="bg-red-500 uppercase px-2 py-1 font-semibold  border-2 border-red-500 hover:bg-yellow-50 transition-all w-20 h-[2.5rem] flex items-center justify-center"
            onClick={handleDeleteItem}
          >
            {isDeleting ? <SmallSpinner /> : "yes"}
          </button>
        </div>
      </div>{" "}
    </section>
  );
}

export default Modal;
