import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "./Components/Home";
import About from "./Components/About";

import Error from "./Components/Error";
import Profiles from "./Components/Profiles";
import AddProfile from "./Components/AddProfile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SingleProfile from "./Components/SingleProfile";
import Hello from "./Components/Hello";
const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="bodyContent">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
        children: [
          {
            path: "/profiles",
            element: <Hello />,
          },
          {
            path: "/profiles/:profileId",
            element: <SingleProfile />,
          },
        ],
      },
      {
        path: "/addProfile",
        element: <AddProfile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
