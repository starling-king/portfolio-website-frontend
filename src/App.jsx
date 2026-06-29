import React from "react";
import { Footer, Header,ServerWakeupBanner } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {

  return  (
    <div>
      {/* <h1 className="text-center text-3xl text-shadow-black">Hello world</h1> */}
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <ServerWakeupBanner />
        <main className="grow w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App;
