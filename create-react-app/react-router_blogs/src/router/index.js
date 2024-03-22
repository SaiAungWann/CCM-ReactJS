import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BlogDetail from "../pages/BlogDetail";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/", //localhost:3000
    element: <App />,
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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blogs/:id", //:name for the path need to recall and use in components
        element: <BlogDetail />,
      },
      {
        path: "*", // if user enter the page that don't have error 404 can edit here
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
