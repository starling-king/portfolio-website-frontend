import React ,{useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "..";
import useDarkMode from "../../hooks/useDarkMode";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const systemRoutes = [
    "login",
    "signin",
    "dashboard",
    "projects",
    "contact",
    "resume",
  ];
  let tenantPrefix = "";

  if (pathSegments.length > 0 && !systemRoutes.includes(pathSegments[0])) {
    tenantPrefix = `/${pathSegments[0]}`;
  }

  const activeTenant = tenantPrefix || location.state?.tenant || "";

  const navItems = [
    { name: "Home", url: activeTenant || "/" },
    { name: "Projects", url: `${activeTenant}/projects` },
    { name: "Resume", url: `${activeTenant}/resume` },
    { name: "Contact", url: `${activeTenant}/contact` },
  ];

  // return (
  //   <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
  //     <Container>
  //       <div className="flex items-center justify-between h-16">
  //         <Link to="/" className="flex items-center gap-2 group shrink-0">
  //           <div className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-indigo-600 rounded-md shadow-sm group-hover:bg-indigo-700">
  //             <span className="font-mono text-lg font-bold">{">_"}</span>
  //           </div>

  //           <span className="hidden text-xl font-bold tracking-tight text-slate-800 sm:block">
  //             Aayush<span className="text-indigo-600">.dev</span>
  //           </span>
  //         </Link>

  //         <nav className="flex-1 ml-4 overflow-x-auto hide-scrollbar">
  //           <ul className="flex items-center justify-end w-max ml-auto space-x-1 sm:space-x-2">
  //             {navItems.map((item) => {
  //               const isActive = location.pathname === item.url;
  //               return (
  //                 <li key={item.name}>
  //                   <button
  //                     onClick={() => navigate(item.url)}
  //                     className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
  //                       isActive
  //                         ? "text-indigo-600 bg-indigo-50"
  //                         : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
  //                     }`}
  //                   >
  //                     {item.name}
  //                   </button>
  //                 </li>
  //               );
  //             })}

  //             <li className="shrink-0">
  //               <button
  //                 onClick={() => navigate("/login")}
  //                 className="px-2 py-2 ml-1 text-sm font-medium transition-colors rounded-md sm:ml-2 sm:px-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
  //                 title="Admin Access"
  //               >
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   className="w-5 h-5"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   stroke="currentColor"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  //                   />
  //                 </svg>
  //               </button>
  //             </li>
  //           </ul>
  //         </nav>
  //       </div>
  //     </Container>
  //   </header>
  // );

return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 outline-none">
            <div className="flex items-center justify-center w-9 h-9 text-white transition-all duration-200 bg-indigo-600 dark:bg-indigo-500 rounded-xl shadow-sm group-hover:scale-105 group-active:scale-95">
              <span className="font-mono text-base font-bold">{">_"}</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Aayush<span className="text-indigo-600 dark:text-indigo-400">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.url)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                      : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Actions (Dark Mode, Admin, Mobile Toggle) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Admin Access"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Mobile Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer (Zero-JS CSS toggle visibility) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.url);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => {
              navigate("/login");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
          >
            Admin Login
          </button>
        </div>
      )}
    </header>
  );

}
