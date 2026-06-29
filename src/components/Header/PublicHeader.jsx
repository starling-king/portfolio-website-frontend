import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "..";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/project" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Engineered Aesthetic */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-600 rounded-md shadow-sm group-hover:bg-indigo-700 transition-colors">
              <span className="font-mono text-lg font-bold">{">_"}</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Aayush<span className="text-indigo-600">.dev</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <nav>
            <ul className="flex items-center space-x-1 sm:space-x-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
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
              
              {/* Subtle Login Link for You */}
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 ml-2 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors"
                  title="Admin Access"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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