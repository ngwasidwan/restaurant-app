function About() {
  return (
    <div className="flex justify-center w-full bg-gray-200  h-svh relative">
      <img
        src="about.jpg"
        alt="about-image"
        className="h-[30rem] w-[50rem] object-cover"
      />
      <div className="absolute text-lg w-11/12 mx-auto ">
        <h1 className="text-center font-semibold text-xl capitalize my-4">
          Welcome to queen mother&apos;s cuisine
        </h1>
        <p className="mb-4 ml-6">
          We are located in the heart of Douala city precisely &quot;Monte Entre
          Lycee Du Bepanda&quot;
        </p>
        <p className="mb-6 ml-6">
          We are the best in terms of quality meals in the city of douala with
          top sanitary conditions
        </p>
        <h2 className="text-center font-semibold text-xl capitalize mb-2">
          How we work
        </h2>

        <ul className="flex flex-col gap-6 ml-6 mb-6">
          <li>
            Meal ordered is delivered to our customers within the hour of
            ordering, at your door step with no extra transportation charges
          </li>
          <li>
            When you place your order, an email will be sent to you on how to
            make payment.(payment before service )
          </li>
          <li>
            When you place an order, delivery will be done within 30 minutes as
            we are a fast and reliable eating house.
          </li>
        </ul>
        <h2 className="font-semibold text-base capitalize mb-1 ml-6">
          Want to reach us?
        </h2>
        <p className="  ml-6 mb-2">
          <span>Email: </span>
          <span className="font-semibold">lenorajoy@gmail.com</span>
        </p>
        <p className="mb-4 ml-6">
          <span>Whatsapp: </span>
          <span className="font-semibold">+237 678 320 883 </span>
        </p>
        <p className="ml-6 text-base  ">
          {" "}
          To cancel payment made for an ordered meal, contact our customer
          service at 678 320 883
        </p>
      </div>
    </div>
  );
}

export default About;
