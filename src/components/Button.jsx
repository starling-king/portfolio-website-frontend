// import React from "react";

// function Button({
//   children,
//   type = "button",
//   bgcolor = "bg-blue-600",
//   textColor = "text-black",
//   className = "",
//   ...props
// }) {
//   return (
//     <button className={`${className} ${bgcolor} ${textColor}`} {...props}>
//       {children}
//     </button>
//   );
// }

// export default Button;


import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary", // primary, secondary, outline, danger
  size = "md", // sm, md, lg
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  // const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 select-none gpu-layer";

  // const variants = {
  //   primary: "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:hover:shadow-indigo-500/15",
  //   secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  //   outline: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/50",
  //   danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
  // };

  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#040405] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 select-none gpu-layer";

  // PSYCH-UI: Replaced cheap indigo with deep, high-contrast designer tokens
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/50 hover:-translate-y-0.5 dark:bg-primary-600 dark:hover:bg-primary-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800/50 hover:-translate-y-0.5",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5 dark:bg-red-600 dark:hover:bg-red-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;