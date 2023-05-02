import * as React from "react";
import { Home } from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Card } from "./components/Card";
import { Listing } from "./pages/Home/Listing";
import { Error404 } from "./pages/Home/404_Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
    errorElement: null,
  },
  {
    path: "/listing/:id",
    element: <Listing />,
    children: [],
    errorElement: null,
  },
  {
    path: "*",
    element: <Error404 />,
    children: [],
    errorElement: null,
  },
]);

export class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}
