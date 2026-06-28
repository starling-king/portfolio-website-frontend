import React from "react";
// import { useDispatch } from "react-redux";
// import adminServices from "./Services/admin_users.Services.js";
// import { login, logout } from "./store/AuthSlice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  // const [loading, setloading] = useState(true);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   adminServices
  //     .getCurrentUser()
  //     .then((data) => {
  //       if (data) {
  //         dispatch(login({ data: data }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .catch((error) => {
  //       // console.error("Failed to fetch current user:", error);
  //       if (error.response?.status !== 401) {
  //         console.error("Backend error:", error);
  //       }
  //       dispatch(logout());
  //     })
  //     .finally(() => setloading(false));
  // }, []);

  return  (
    <div>
      <h1 className="text-center text-3xl text-shadow-black">Hello world</h1>
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App;
