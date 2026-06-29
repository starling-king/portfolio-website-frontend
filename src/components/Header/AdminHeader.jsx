import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, LogoutBtn } from "..";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const adminNavItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Manage Projects", url: "/admin/projects" },
    { name: "Inbox", url: "/admin/messages" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-md">
      <Container>
        <div className="flex items-center justify-between h-14">
          {/* Admin Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-bold tracking-wider text-green-400 uppercase bg-green-400/10 rounded border border-green-400/20">
              Admin Mode
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-200">
              System Control
            </span>
          </Link>

          {/* Admin Navigation */}
          <nav>
            <ul className="flex items-center space-x-2">
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
                        isActive
                          ? "text-white bg-slate-700"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
              <li className="pl-4 border-l border-slate-700">
                <LogoutBtn />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}