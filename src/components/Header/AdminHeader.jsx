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
    { name: "Builder", url: "/admin/builder" },
    { name: "Resume", url: "/admin/resume" },
    { name: "Profile", url: "/admin/profile" },
  ];

  // return (
  //   <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-md">
  //     <Container>
  //       <div className="flex items-center justify-between h-14">
  //         <Link to="/" className="flex items-center gap-2 shrink-0">
  //           <span className="px-2 py-1 text-xs font-bold tracking-wider text-green-400 uppercase bg-green-400/10 rounded border border-green-400/20 sm:hidden">
  //             Admin
  //           </span>
  //           <span className="hidden px-2 py-1 text-xs font-bold tracking-wider text-green-400 uppercase bg-green-400/10 rounded border border-green-400/20 sm:block">
  //             Admin Mode
  //           </span>

  //           <span className="hidden text-lg font-semibold tracking-tight text-slate-200 md:block">
  //             System Control
  //           </span>
  //         </Link>

  //         <nav className="flex-1 ml-4 overflow-x-auto hide-scrollbar">
  //           <ul className="flex items-center justify-end w-max ml-auto space-x-1 sm:space-x-2">
  //             {adminNavItems.map((item) => {
  //               const isActive = location.pathname === item.url;
  //               return (
  //                 <li key={item.name}>
  //                   <button
  //                     onClick={() => navigate(item.url)}
  //                     className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 whitespace-nowrap ${
  //                       isActive
  //                         ? "text-white bg-slate-700"
  //                         : "text-slate-400 hover:text-white hover:bg-slate-800"
  //                     }`}
  //                   >
  //                     {item.name}
  //                   </button>
  //                 </li>
  //               );
  //             })}
  //             <li className="pl-2 ml-1 border-l sm:pl-4 sm:ml-2 border-slate-700 shrink-0">
  //               <LogoutBtn />
  //             </li>
  //           </ul>
  //         </nav>
  //       </div>
  //     </Container>
  //   </header>
  // );

return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800 shadow-md">
      <Container>
        <div className="flex items-center justify-between h-16">
          
          {/* Admin Logo Area */}
          <Link to="/" className="flex items-center gap-3 shrink-0 outline-none group">
            <div className="flex items-center justify-center px-2.5 py-1 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Admin Mode</span>
            </div>
            <span className="hidden text-lg font-semibold tracking-tight text-slate-100 md:block group-hover:text-white transition-colors">
              System Control
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex-1 ml-6 overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-end w-max ml-auto space-x-1.5 sm:space-x-2">
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        isActive
                          ? "text-white bg-slate-800 shadow-sm"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
              
              <li className="pl-3 ml-2 border-l border-slate-800 shrink-0">
                <LogoutBtn />
              </li>
            </ul>
          </nav>

        </div>
      </Container>
    </header>
  );

}
