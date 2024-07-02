function ReviewItem({ item }) {
  return (
    <div className="border-2 border-stone-300 px-4 mb-8 rounded-md text-stone-600 bg-stone-100">
      <div className="flex gap-4 items-center my-2">
        <img src="avatar.jpg" alt="avatar" className="w-[50px] rounded-full" />
        <p>{item.name}</p>
      </div>
      <p className="text-base mb-4 ">{item.review}</p>
    </div>
  );
}

export default ReviewItem;
