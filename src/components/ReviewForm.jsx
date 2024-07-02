import { useForm } from "react-hook-form";
import FormError from "./FormError";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../services/addReview";
import SmallSpinner from "../components/SmallSpinner";

function ReviewForm({ setAddReview }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      setAddReview(false);
    },
    onError: () => toast.error("Failed to add review"),
  });
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function submit(data) {
    mutate(data);
  }

  return (
    <form
      className="border-2 border-stone-300 px-4 rounded-md  py-4"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex gap-4 mb-8 flex-wrap items-center">
        <label htmlFor="name">Customer Name</label>
        <input
          type="text"
          id="name"
          className="focus:outline-none border-2 border-stone-200 rounded-md px-.5 py-1 focus:border-yellow-200 "
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name && <FormError>{errors?.name.message}</FormError>}
      </div>
      <div className="mb-4 relative">
        <textarea
          className="border-stone-300 border-2 w-full p-4 focus:outline-none focus:border-yellow-300 rounded-md resize-none "
          placeholder="Add Review"
          name="review"
          {...register("review", {
            required: "This field is required",
          })}
        ></textarea>{" "}
        {errors?.name && <FormError>{errors?.review.message}</FormError>}
      </div>
      <button
        type="reset"
        className="bg-stone-200 rounded-sm px-2 py-.5 font-semibold  border-2 border-stone-500 hover:bg-stone-50 transition-all mb-6 mr-10"
        onClick={() => setAddReview(false)}
      >
        Cancel
      </button>
      <button className="bg-yellow-500 rounded-sm px-2 py-.5 font-semibold  border-2 border-yellow-500 hover:bg-yellow-50 transition-all mb-6 ">
        {" "}
        Add
      </button>
      {isLoading && <SmallSpinner right={2} />}
    </form>
  );
}

export default ReviewForm;
