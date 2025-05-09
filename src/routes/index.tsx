import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "..";
import SectionAnalyz from "../section-analyz/sectionAnalyz";
import PdfQuizPage from "../section-two/pdf";
import SectionTwo from "../section-two/section-two";
import Test from "../test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },

  {
    path: "/section-analyze",
    element: <SectionAnalyz />,
  },
  {
    path: "/section-two",
    element: <SectionTwo />,
  },
  {
    path: "/section-two/pdf",
    element: <PdfQuizPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
