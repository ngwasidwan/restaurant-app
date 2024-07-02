import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navigation from "./Navigation";
import Header from "./Header";

function AppLayout() {
  return (
    <main className="text-lg relative">
      <Toaster />
      <Header />

      <section className="flex gap-[2rem] md:w-11/12  mx-auto md:pt-8 pt-0 ">
        <Navigation />

        <div className="md:h-[70vh] h-[80vh] w-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AppLayout;
