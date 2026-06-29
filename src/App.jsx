import React from "react";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {

  return  (
    <div>
      {/* <h1 className="text-center text-3xl text-shadow-black">Hello world</h1> */}
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App;
