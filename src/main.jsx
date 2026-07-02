import { createRoot } from "react-dom/client";
import "../src/css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import AdminAuthLayout from "./components/AdminAuthLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

// main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      
      // AUTH & ADMIN ROUTES (Independent of usernames)
      { 
        path: "login", 
        element: <Login /> 
      },
      { 
        path: "signin", 
        element: <Signin /> 
      },
      { 
        path: "dashboard", 
        element: (
          <AdminAuthLayout>
            <div>Dashboard Component Goes Here</div> 
          </AdminAuthLayout>
        ) 
      },

      // MULTI-TENANT ROUTES 
      { 
        path: ":username", 
        element: <Home /> 
      },
      { 
        path: ":username/project", 
        element: <Projects /> 
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
