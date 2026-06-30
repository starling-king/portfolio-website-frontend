import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import AdminAuthLayout from "./components/AdminAuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/dashboard",
        element: (
            <AdminAuthLayout>
                <div>Dashboard Component Goes Here</div> {/* Replace with <Dashboard /> */}
            </AdminAuthLayout>
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

);
