import { useForm } from "react-hook-form";
import FormError from "./FormError";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, formState, handleSubmit } = useForm();

  const navigate = useNavigate();
  function submit(data) {
    localStorage.setItem("userPassword", JSON.stringify(data.password));

    navigate("/home");
  }

  function onError(error) {
    console.log(error);
  }
  const { errors } = formState;
  return (
    <div className="flex items-center justify-center h-svh  ">
      <div className="p-4 ">
        <div className="flex gap-10 -center mb-10 items-center ">
          <img src="logo.jpg" alt="logo" className="w-[4rem]   rounded-full " />
          <h1 className="text-xl font-bold">Queen Mother&apos;s Cuisine</h1>
        </div>
        <form onSubmit={handleSubmit(submit, onError)}>
          <div className="mb-6">
            <label className="text-lg mr-6" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              type="text"
              className=" focus:outline-none border-2 border-stone-200 rounded-md p-2 focus:border-yellow-200  font-semibold "
              {...register("username", {
                required: "This field is Required",
              })}
            />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </div>
          <div className="mb-8">
            <label className="text-lg mr-6" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="ml-auto focus:outline-none border-2 border-stone-200 rounded-md p-2 focus:border-yellow-200  font-semibold "
              {...register("password", {
                required: "This field is Required",
                minLength: {
                  value: 6,
                  message: "password length must be greater than 6 characters",
                },
              })}
            />
            {errors?.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>

          <button className="bg-yellow-500  font-semibold rounded-md border-2 border-yellow-500 hover:bg-yellow-50 transition-all py-1 px-3 w-full">
            Login
          </button>
        </form>{" "}
      </div>{" "}
    </div>
  );
}

export default Login;
