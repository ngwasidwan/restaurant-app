import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-10 relative  ">
      <div className="z-10 md:h-auto h-[93vh] bg-stone-900 bg-opacity-60 md:bg-opacity-0 flex md:block items-center">
        <div>
          <h1 className="font-bold md:text-3xl text-2xl mb-6 capitalize  text-center md:text-start text-yellow-600 md:text-inherit ">
            Feel like royalty with every bite
          </h1>
          <h2 className="italic font-semibold mb-4 text-yellow-500 text-xl md:text-lg text-center md:text-start tracking-[.1rem] md:tracking-normal">
            Taste! and Feel the Equilibrium between Price and Quality.
          </h2>
          <p className="text-center md:text-start md:mb-2 md:ml-0 ml-2 text-stone-300 md:text-inherit mb-4">
            Located in the city of Douala we offer the best eating experience
            for your personal satisfaction and taste.
          </p>

          <p className="text-center md:text-start mb-8 text-stone-300 md:text-inherit md:ml-0 ml-2">
            {" "}
            We serve all kinds of African dishes ensuring a maximum sanitary
            eating environment.
          </p>
          <div className="w-full flex justify-center md:block ">
            <button
              className="bg-yellow-500 uppercase px-3 py-2 font-semibold rounded-md border-2 border-yellow-500 md:hover:bg-white hover:bg-transparent transition-all hover:text-yellow-600"
              onClick={() => navigate("/menu")}
            >
              Eat with us now
            </button>{" "}
          </div>
        </div>
      </div>

      <figure className="absolute md:static top-0 ">
        <img
          src="home.jpg"
          alt="restaurant image"
          className=" shadow-md shadow-stone-400  object-cover md:h-auto h-[90vh]"
        />
      </figure>
    </div>
  );
}

export default Home;
