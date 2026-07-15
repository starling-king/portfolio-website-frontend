// import { createRoot } from "react-dom/client";
// import "../src/css/index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./components/Login";
// import Signin from "./components/Signin";
// import AdminAuthLayout from "./components/AdminAuthLayout";
// import Home from "./pages/Home";
// import Projects from "./pages/Projects";
// import ProjectDetail from "./pages/ProjectDetail";
// import Contact from "./pages/Contact";
// import AdminProjectList from "./components/AdminProjectList.jsx";
// import ProjectEditorForm from "./components/ProjectEditorForm.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       // --- 1. ROOT DOMAIN (ayushdev.online) Defaults to your profile ---
//       { index: true, element: <Home /> },
//       { path: "projects", element: <Projects /> }, 
//       { path: "project/:slug", element: <ProjectDetail /> }, 
//       { path: "contact", element: <Contact /> }, 

//       // --- 2. AUTH & ADMIN ROUTES ---
//       { path: "login", element: <Login /> },
//       { path: "signin", element: <Signin /> },
//       // { 
//       //   path: "dashboard", 
//       //   element: (
//       //     <AdminAuthLayout>
//       //       <div>Dashboard Component Goes Here</div> 
//       //     </AdminAuthLayout>
//       //   ) 
//       // },

//       { 
//         path: "dashboard", 
//         element:<AdminAuthLayout>
//       //       <div>Dashboard Component Goes Here</div> 
//       //     </AdminAuthLayout>, 
//         children: [
//             { index: true, element: <div className="p-8 text-xl font-bold text-slate-800">Overall Dashboard / AI API Overview Goes Here</div> }, 
//             { path: "projects", element: <AdminProjectList /> }, 
//             { path: "projects/new", element: <ProjectEditorForm /> },
//             { path: "projects/edit/:id", element: <ProjectEditorForm /> }
//         ]
//       },

//       // --- 3. MULTI-TENANT ROUTES (ayushdev.online/john) ---
//       { path: ":username", element: <Home /> },
//       { path: ":username/projects", element: <Projects /> }, 
//       { path: ":username/project/:slug", element: <ProjectDetail /> }, 
//       { path: ":username/contact", element: <Contact /> }
//     ],
//   },
  
// ]);

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>,
// );


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
import AdminProjectList from "./components/AdminProjectList.jsx";
import ProjectEditorForm from "./components/ProjectEditorForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 1. ROOT DOMAIN (Defaults to your master profile)
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> }, 
      { path: "project/:slug", element: <ProjectDetail /> }, 
      { path: "contact", element: <Contact /> }, 

      // 2. AUTH ROUTES (Evaluated BEFORE multi-tenant)
      { path: "login", element: <Login /> },
      { path: "signin", element: <Signin /> },

      // 3. ADMIN ROUTES (Evaluated BEFORE multi-tenant)
      // We will use "admin" as you requested, NOT dashboard.
      { 
        path: "admin", 
        element: <AdminAuthLayout />, 
        children: [
            { index: true, element: <div className="p-8 text-xl font-bold text-slate-800">Overall Admin Dashboard Goes Here</div> }, 
            { path: "projects", element: <AdminProjectList /> }, 
            { path: "projects/new", element: <ProjectEditorForm /> },
            { path: "projects/edit/:id", element: <ProjectEditorForm /> },
            // Added messages route to fix your console error
            { path: "messages", element: <div className="p-8 text-xl font-bold text-slate-800">Inbox Goes Here</div> } 
        ]
      },

      // 4. MULTI-TENANT CATCH-ALL (Must ALWAYS be at the very bottom)
      // If it's not /, /login, or /admin, React Router finally assumes it is a username.
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
