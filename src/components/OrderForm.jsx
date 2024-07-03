import { useForm } from "react-hook-form";
import FormError from "./FormError";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SmallSpinner from "./SmallSpinner";
import { updateOrder, uploadOrder } from "../services/apiOrder";

import { userPassword as getUserPassword } from "../services/storage";
import { useMyContext } from "../services/useMyContext";

const style = {
  display: "grid",
  gridTemplateColumns: " 2fr 1fr",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
  gridAutoFlow: "col",
};

function OrderForm() {
  const queryClient = useQueryClient();

  //place order
  const { isLoading: isUploading, mutate: placeOrder } = useMutation({
    mutationFn: uploadOrder,
    onSuccess: () => {
      toast.success("Order placed successfully");
      reset();
    },
    onError: () => toast.error("Connection problem. Failed to place order."),
  });

  //update order
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      toast.success("Order edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      setOpenForm(false);
    },
    onError: () => toast.error("Connection problem. Failed to edit order"),
  });

  //state variables
  const [addDrink, setAddDrink] = useState(false);
  const { setOpenForm, itemData, canEdit } = useMyContext();

  useEffect(() => {
    if (canEdit && itemData.drinks) setAddDrink(true);
  }, [canEdit, itemData]);

  //form submission with react hook forms
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: canEdit ? itemData : {},
  });

  const { errors } = formState;

  function submitOrder(data) {
    const password = getUserPassword();

    if (canEdit) {
      const { numPlates } = data;

      const editedData = addDrink
        ? { ...data, numPlates, numBottles: data.numBottles, id: itemData.id }
        : {
            meal: data.meal,
            price: data.price,
            numPlates,
            id: itemData.id,
            password,
          };

      update(editedData);
    } else placeOrder({ ...data, password, id: itemData.id });
  }

  function onError(error) {
    console.log(error);
  }

  function handleChecked(e) {
    setAddDrink(e.target.checked);
  }
  return (
    <div className="bg-white  absolute z-10 lg:z-20 w-full left-0  top-16 md:h-[100vh] h-[150vh] md:top-[7.5rem] flex">
      <form
        className="text-lg p-4 w-3/4 mx-auto shadow-md shadow-stone-600 text-stone-600  mt-28"
        onSubmit={handleSubmit(submitOrder, onError)}
      >
        <div style={style}>
          <div className="flex flex-wrap gap-4 items-center">
            <label htmlFor="meal" className="font-semibold ">
              Name of meal
            </label>
            <input
              id="meal"
              readOnly
              value={itemData.meal}
              className="lg:ml-auto ml-0 focus:outline-none border-2 border-stone-200 rounded-md px-2 py-3  focus:border-yellow-200  font-semibold max-w-[20rem]"
              {...register("meal")}
            />
          </div>
        </div>

        <div style={style}>
          <div className="flex flex-wrap gap-4 items-center">
            <label htmlFor="numPlates" className="font-semibold">
              {" "}
              Number of plates{" "}
            </label>
            <input
              type="number"
              id="numPlates"
              className="lg:ml-auto ml-0 focus:outline-none border-2 border-stone-200 rounded-md px-2 py-3 focus:border-yellow-200 max-w-[20rem]"
              {...register("numPlates", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "value must be greater than 0",
                },
              })}
            />
            {errors?.numPlates?.message && (
              <FormError>{errors.numPlates.message}</FormError>
            )}
          </div>
        </div>

        {addDrink && (
          <>
            <div style={style}>
              <div className="flex flex-wrap gap-4 items-center">
                <label htmlFor="drinks" className="font-semibold">
                  Select Drink
                </label>
                <select
                  id="drinks"
                  className="lg:ml-auto ml-0 focus:outline-none border-2 border-stone-200 rounded-md px-2 py-3 focus:border-yellow-200 max-w-[20rem]"
                  {...register("drinks", {
                    required: "This field is required",
                  })}
                >
                  <option></option>
                  <option>Bavaria</option>
                  <option>Fruitas</option>
                  <option>Whisky Cola</option>
                  <option>Ice Pineapple Punch </option>
                  <option>Ice Black</option>
                  <option>Skoll</option>
                  <option>Chill</option>
                  <option>Heiniken</option>
                </select>
                {errors?.drinks && (
                  <FormError>{errors?.drinks.message}</FormError>
                )}
              </div>
            </div>

            <div style={style}>
              <div className="flex flex-wrap gap-4 items-center">
                <label htmlFor="numBottles" className="font-semibold">
                  {" "}
                  Number of bottles{" "}
                </label>
                <input
                  type="number"
                  id="numBottles"
                  className="lg:ml-auto ml-0 focus:outline-none border-2 border-stone-200 rounded-md px-2 py-3 focus:border-yellow-200 max-w-[20rem]"
                  {...register("numBottles", {
                    required: "This field is required",
                    min: { value: 1, message: "value must be greater than 0" },
                  })}
                />
                {errors?.numBottles && (
                  <FormError>{errors.numBottles.message}</FormError>
                )}
              </div>
            </div>
          </>
        )}

        <div style={style}>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold"> Price per plate</span>
            <input
              className="lg:ml-auto ml-0 focus:outline-none border-2 border-stone-200 rounded-md px-2 py-3  max-w-[20rem]"
              readOnly
              value={itemData.price}
              {...register("price")}
            />
          </div>
        </div>

        <p className="text-sm mt-8">
          All drinks are sold at 1000FCFA. check the box below to add a drink
        </p>
        <input
          type="checkbox"
          id="addDrink"
          checked={addDrink}
          onChange={handleChecked}
          className="cursor-pointer"
        />
        <label htmlFor="addDrink" className="text-sm ml-2">
          Add a drink
        </label>

        <div className="flex items-center mt-6 relative">
          <button
            type="reset"
            onClick={() => setOpenForm(false)}
            className="border-2 border-stone-600 text-sm px-2"
          >
            &larr; CLOSE
          </button>
          <button
            className="bg-yellow-500 uppercase font-semibold rounded-md border-2 border-yellow-500 hover:bg-yellow-50 transition-all ml-auto w-32 py-2 h-12 flex items-center justify-center"
            disabled={isUploading}
          >
            {isUploading || isUpdating ? (
              <SmallSpinner />
            ) : canEdit ? (
              "edit"
            ) : (
              "order now"
            )}
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default OrderForm;
