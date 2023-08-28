import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/products/home/HomePage";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetails from "../../features/products/details/ProductDetails";
import TestErrors from "../../features/products/errors/TestError";
import NotFound from "../../features/products/errors/NotFound";
import ServerError from "../../features/products/errors/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductDashboard /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "createProduct", element: <ProductForm key="create" /> },
      { path: "manage/:id", element: <ProductForm key="manage" /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
