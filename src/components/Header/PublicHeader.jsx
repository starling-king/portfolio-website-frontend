import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "..";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  //get seprate array of the username and the endpoint this comment is written by me
  const pathSegments = location.pathname.split('/').filter(Boolean);

  //defining the system route if it is their or not written by me not ai 
  const systemRoutes = ["login", "signin", "dashboard", "projects", "contact"];
  let tenantPrefix = "";

  //If the first word in the URL is NOT a system route, it must be a user's name! written by me not ai
  if (pathSegments.length > 0 && !systemRoutes.includes(pathSegments[0])) {
      tenantPrefix = `/${pathSegments[0]}`; // e.g., "/john"
  }

// If the URL doesn't have a username (like on /login), check if they brought an invisible sticky note (state.tenant)
  const activeTenant = tenantPrefix || location.state?.tenant || "";

  const navItems = [
    { name: "Home", url: activeTenant || "/" },
    { name: "Projects", url: `${activeTenant}/projects` },
    { name: "Contact", url: `${activeTenant}/contact` },
  ];

 return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-indigo-600 rounded-md shadow-sm group-hover:bg-indigo-700">
              <span className="font-mono text-lg font-bold">{">_"}</span>
            </div>
            {/* The full text only shows on screens larger than mobile */}
            <span className="hidden text-xl font-bold tracking-tight text-slate-800 sm:block">
              Aayush<span className="text-indigo-600">.dev</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex-1 ml-4 overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-end w-max ml-auto space-x-1 sm:space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
              
              {/* Subtle Login Link */}
              <li className="shrink-0">
                <button
                  onClick={() => navigate("/login")}
                  className="px-2 py-2 ml-1 text-sm font-medium transition-colors rounded-md sm:ml-2 sm:px-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
                  title="Admin Access"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
          
        </div>
      </Container>
    </header>
  );
}