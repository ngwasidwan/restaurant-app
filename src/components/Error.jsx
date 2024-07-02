import { useNavigate } from "react-router-dom";

function Error({ children }) {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center h-svh bg-stone-100">
      <div className="bg-stone-200  text-center px-4 py-8 flex items-center justify-center  rounded-md flex-col gap-4">
        <p>{children}</p>
        <button
          className="border-2 border-stone-600 px-2 py-1"
          onClick={() => navigate(-1)}
        >
          &larr; BACK
        </button>
      </div>
    </div>
  );
}

export default Error;
