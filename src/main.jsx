import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";

const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/login",
      element:<Login/>
    }
  ]
}])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
  <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
);
