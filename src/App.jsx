import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, createContext, lazy, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./components/Login"));
const Menu = lazy(() => import("./pages/Menu"));

import AppLayout from "./components/AppLayout";
import Error from "./components/Error";
import ProtectApp from "./components/ProtectApp";
import Spinner from "./components/Spinner";

const queryClient = new QueryClient();
export const MyContext = createContext();

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [showNavMenu, setShowNavMenu] = useState(false);

  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<Spinner />}>
          <ProtectApp>
            <AppLayout />
          </ProtectApp>
        </Suspense>
      ),
      errorElement: <Error>Page could not be found</Error>,
      children: [
        {
          path: "/",
          element: <Navigate replace to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/reviews",
          element: <Reviews />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider
        value={{
          openModal,
          showMenu,
          openForm,
          itemData,
          canEdit,
          userPassword,
          showNavMenu,

          setOpenModal,
          setShowMenu,
          setOpenForm,
          setItemData,
          setCanEdit,
          setUserPassword,
          setShowNavMenu,
        }}
      >
        <RouterProvider router={router} />
      </MyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
