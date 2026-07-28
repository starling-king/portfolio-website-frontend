// import React from "react";

// function Input({ label, type = "text", className = "", ...props }, ref) {
//   return (
//     <div className="w-full">
//       {label && <label className="inline-block mb-1 pl-1">{label}</label>}
//       <input type={type} className={`${className}`} ref={ref} {...props} />
//     </div>
//   );
// }

// export default React.forwardRef(Input);


import React, { useId } from "react";

function Input({ label, type = "text", className = "", error, required, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input 
        id={id}
        type={type} 
        ref={ref}
        required={required}
        className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border rounded-xl border-slate-300 dark:border-slate-700 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        } ${className}`} 
        {...props} 
      />
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default React.forwardRef(Input);
