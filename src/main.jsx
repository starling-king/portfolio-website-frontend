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
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // --- 1. ROOT DOMAIN (ayushdev.online) Defaults to your profile ---
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> }, 
      { path: "project/:slug", element: <ProjectDetail /> }, 
      { path: "contact", element: <Contact /> }, 

      // --- 2. AUTH & ADMIN ROUTES ---
      { path: "login", element: <Login /> },
      { path: "signin", element: <Signin /> },
      { 
        path: "dashboard", 
        element: (
          <AdminAuthLayout>
            <div>Dashboard Component Goes Here</div> 
          </AdminAuthLayout>
        ) 
      },

      // --- 3. MULTI-TENANT ROUTES (ayushdev.online/john) ---
      { path: ":username", element: <Home /> },
      { path: ":username/projects", element: <Projects /> }, 
      { path: ":username/project/:slug", element: <ProjectDetail /> }, 
      { path: ":username/contact", element: <Contact /> }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
