import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewItem from "../components/ReviewItem";
import Spinner from "../components/Spinner";
import { getReviews } from "../services/getReviews";
import Error from "../components/Error";
function Reviews() {
  const [addReview, setAddReview] = useState(false);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  if (isLoading && !isFetching)
    return (
      <Error>
        Unable to connect to our servers. Check your internet connection
      </Error>
    );
  if (isLoading) return <Spinner />;
  if (isError) return <Error>{error.message}</Error>;

  return (
    <div className="w-3/4 md:w-2/3  lg:mx-0 mx-auto">
      <h1 className="text-xl font-semibold my-2">Reviews from our customers</h1>
      {data.map((item, i) => (
        <ReviewItem key={i} item={item} />
      ))}

      {!addReview && (
        <button
          className="bg-yellow-500 rounded-md px-2 py-1 font-semibold  border-2 border-yellow-500 hover:bg-yellow-50 transition-all mb-6 "
          onClick={() => setAddReview(true)}
        >
          Add a review
        </button>
      )}
      {addReview && <ReviewForm setAddReview={setAddReview} />}
    </div>
  );
}

export default Reviews;
