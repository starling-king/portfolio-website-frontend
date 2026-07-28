// import React, { useId } from "react";

// function Select({ options, label, className = "", ...props }, ref) {
//   const id = useId();

//   return (
//     <div className="w-full">
//       {label && <label htmlFor={id} className=""></label>}
//       <select id={id} {...props} ref={ref} className={`${className}`}>
//         {options?.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default React.forwardRef(Select);

import React, { useId } from "react";

function Select({ options, label, className = "", required, error, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select 
        id={id} 
        ref={ref} 
        required={required}
        className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border rounded-xl border-slate-300 dark:border-slate-700 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        } ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default React.forwardRef(Select);