import React,{useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, LogoutBtn } from "..";
import useDarkMode from "../../hooks/useDarkMode";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isDark, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

// return (
//     <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800 shadow-md">
//       <Container>
//         <div className="flex items-center justify-between h-16">
          
//           {/* Admin Logo Area */}
//           <Link to="/" className="flex items-center gap-3 shrink-0 outline-none group">
//             <div className="flex items-center justify-center px-2.5 py-1 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
//               <span className="sm:hidden">Admin</span>
//               <span className="hidden sm:inline">Admin Mode</span>
//             </div>
//             <span className="hidden text-lg font-semibold tracking-tight text-slate-100 md:block group-hover:text-white transition-colors">
//               System Control
//             </span>
//           </Link>

//           {/* Navigation Items */}
//           <nav className="flex-1 ml-6 overflow-x-auto hide-scrollbar">
//             <ul className="flex items-center justify-end w-max ml-auto space-x-1.5 sm:space-x-2">
//               {adminNavItems.map((item) => {
//                 const isActive = location.pathname === item.url;
//                 return (
//                   <li key={item.name}>
//                     <button
//                       onClick={() => navigate(item.url)}
//                       className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
//                         isActive
//                           ? "text-white bg-slate-800 shadow-sm"
//                           : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
//                       }`}
//                     >
//                       {item.name}
//                     </button>
//                   </li>
//                 );
//               })}
              
//               <li className="pl-3 ml-2 border-l border-slate-800 shrink-0">
//                 <LogoutBtn />
//               </li>
//             </ul>
//           </nav>

//         </div>
//       </Container>
//     </header>
//   );

return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#040405]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-none transition-colors duration-300 gpu-layer">
      <Container>
        <div className="flex items-center justify-between h-16">
          
          {/* Admin Logo Area */}
          <Link to="/" className="flex items-center gap-3 shrink-0 outline-none group gpu-layer">
            <div className="flex items-center justify-center px-2.5 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors duration-300">
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Admin Mode</span>
            </div>
            <span className="hidden text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 lg:block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              System Control
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex flex-1 items-center justify-end gap-1.5 ml-6">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.url)}
                  className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap outline-none gpu-layer ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-100/80 dark:bg-slate-800/80 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:-translate-y-0.5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>
              
          {/* Global Actions (Dark Mode, Desktop Logout, Mobile Hamburger) */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-4 md:pl-4 md:border-l border-slate-200 dark:border-slate-800 shrink-0">
            {/* Dark Mode Toggle (Always Visible) */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 outline-none hover:-translate-y-0.5 gpu-layer group"
              aria-label="Toggle Dark Mode"
            >
              <div className="transition-transform duration-500 group-hover:rotate-12 group-active:rotate-0">
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>
            
            {/* Desktop Logout (Hidden on Mobile) */}
            <div className="hidden md:block">
              <LogoutBtn />
            </div>

            {/* Mobile Hamburger Icon (Hidden on Desktop) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl outline-none transition-all duration-300 active:scale-95 gpu-layer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </Container>

      {/* Mobile Drawer (Hardware Accelerated CSS Toggle) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-white/95 dark:bg-[#040405]/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-lg ${
          mobileMenuOpen ? "max-h-[600px] opacity-100 border-b" : "max-h-0 opacity-0 pointer-events-none border-b-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.url);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 outline-none ${
                  isActive 
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:pl-6"
                }`}
              >
                {item.name}
              </button>
            )
          })}
          
          <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-3"></div>
          
          {/* Mobile Logout Container */}
          <div className="flex justify-start px-2">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </header>
  );

}
