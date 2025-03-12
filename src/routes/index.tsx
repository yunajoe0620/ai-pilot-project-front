import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "..";
import SectionAnalyz from "../section-analyz/sectionAnalyz";
import SectionTwo from "../section-two";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/section-two",
    element: <SectionTwo />,
  },

  {
    path: "/section-analyze",
    element: <SectionAnalyz />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
