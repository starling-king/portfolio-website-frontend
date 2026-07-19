import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, LogoutBtn } from "..";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const adminNavItems = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Projects", url: "/admin/projects" },
    { name: "Inbox", url: "/admin/messages" },
    { name: "Profile", url: "/admin/profile" },
  ];

return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-md">
      <Container>
        <div className="flex items-center justify-between h-14">
          
          {/* Admin Logo - shrink-0 prevents it from being crushed */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* Short label on mobile, full label on larger screens */}
            <span className="px-2 py-1 text-xs font-bold tracking-wider text-green-400 uppercase bg-green-400/10 rounded border border-green-400/20 sm:hidden">
              Admin
            </span>
            <span className="hidden px-2 py-1 text-xs font-bold tracking-wider text-green-400 uppercase bg-green-400/10 rounded border border-green-400/20 sm:block">
              Admin Mode
            </span>
            {/* Hidden on mobile to save space */}
            <span className="hidden text-lg font-semibold tracking-tight text-slate-200 md:block">
              System Control
            </span>
          </Link>

          {/* Navigation - overflow-x-auto allows swiping on mobile */}
          <nav className="flex-1 ml-4 overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-end w-max ml-auto space-x-1 sm:space-x-2">
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 whitespace-nowrap ${
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
              <li className="pl-2 ml-1 border-l sm:pl-4 sm:ml-2 border-slate-700 shrink-0">
                <LogoutBtn />
              </li>
            </ul>
          </nav>
          
        </div>
      </Container>
    </header>
  );
}