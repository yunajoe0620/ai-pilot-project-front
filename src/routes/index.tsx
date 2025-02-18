import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "..";
import SectionOne from "../section-one";
import SectionTwo from "../section-two";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/one",
    element: <SectionOne />,
  },
  {
    path: "/section-two",
    element: <SectionTwo />,
  },
]);

function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;
