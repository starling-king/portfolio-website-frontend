import { createRoot } from "react-dom/client";
import "../src/css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Public Imports
import Login from "./components/Login";
import Signin from "./components/Signin";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

// Admin Imports
import AdminAuthLayout from "./components/AdminAuthLayout";
import AdminProjectList from "./components/AdminProjectList.jsx";
import ProjectEditorForm from "./components/ProjectEditorForm.jsx";
import AdminInbox from "./pages/AdminInbox.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> }, 
      { path: "project/:slug", element: <ProjectDetail /> }, 
      { path: "contact", element: <Contact /> }, 

      { path: "login", element: <Login /> },
      { path: "signin", element: <Signin /> },

      // --- 3. ADMIN ROUTES (THE HIERARCHICAL FIX) ---
      { 
        path: "admin", 
        element: <AdminAuthLayout />, 
        children: [
            { index: true, element: <div className="p-8 text-xl font-bold text-slate-800">Overall Admin Dashboard Goes Here</div> }, 
            
            
            {
                path: "projects",
                children: [
                    { index: true, element: <AdminProjectList /> }, 
                    { path: "new", element: <ProjectEditorForm /> }, 
                    { path: "edit/:id", element: <ProjectEditorForm /> } 
                ]
            },
            
            { path: "messages", element: <AdminInbox /> }
        ]
      },

      // --- 4. MULTI-TENANT CATCH-ALL ---
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