import React, { useState } from "react";
import contactMessageService from "../Services/contact_messages.Services";
import { useParams } from "react-router-dom";

function Contact() {
  const { username } = useParams();
  const targetUser = username || "ayush";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("All fields are required.");
      }

      await contactMessageService.SavetheDataOfForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        username: targetUser,
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error?.message || "Something went wrong. Please try again.",
      );
    }
  };

  // return (
  //   <section className="px-4 py-16 mx-auto max-w-7xl">
  //     <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
  //       <div className="text-center mb-10">
  //         <h1 className="text-3xl font-extrabold text-slate-900">
  //           Get in Touch
  //         </h1>
  //         <p className="mt-4 text-slate-600">
  //           Have a question or want to work together? Drop a message for{" "}
  //           {targetUser}.
  //         </p>
  //       </div>

  //       {status === "success" ? (
  //         <div className="p-6 text-center bg-green-50 rounded-xl border border-green-100">
  //           <svg
  //             className="w-12 h-12 mx-auto text-green-500 mb-4"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>
  //           <h3 className="text-lg font-bold text-green-900">Message Sent!</h3>
  //           <p className="mt-2 text-green-700">
  //             Thanks for reaching out. We'll get back to you soon.
  //           </p>
  //           <button
  //             onClick={() => setStatus("idle")}
  //             className="mt-6 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
  //           >
  //             Send Another Message
  //           </button>
  //         </div>
  //       ) : (
  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           {status === "error" && (
  //             <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
  //               {errorMessage}
  //             </div>
  //           )}

  //           <div>
  //             <label
  //               htmlFor="name"
  //               className="block text-sm font-medium text-slate-700"
  //             >
  //               Full Name
  //             </label>
  //             <input
  //               type="text"
  //               name="name"
  //               id="name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               disabled={status === "loading"}
  //               className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none disabled:bg-slate-50"
  //               placeholder="John Doe"
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="email"
  //               className="block text-sm font-medium text-slate-700"
  //             >
  //               Email Address
  //             </label>
  //             <input
  //               type="email"
  //               name="email"
  //               id="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               disabled={status === "loading"}
  //               className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none disabled:bg-slate-50"
  //               placeholder="john@example.com"
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="message"
  //               className="block text-sm font-medium text-slate-700"
  //             >
  //               Message
  //             </label>
  //             <textarea
  //               name="message"
  //               id="message"
  //               rows="5"
  //               value={formData.message}
  //               onChange={handleChange}
  //               disabled={status === "loading"}
  //               className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none resize-y disabled:bg-slate-50"
  //               placeholder="How can we collaborate?"
  //             ></textarea>
  //           </div>

  //           <button
  //             type="submit"
  //             disabled={status === "loading"}
  //             className="w-full flex justify-center items-center px-6 py-3 text-base font-medium text-white transition-colors bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
  //           >
  //             {status === "loading" ? (
  //               <>
  //                 <svg
  //                   className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <circle
  //                     className="opacity-25"
  //                     cx="12"
  //                     cy="12"
  //                     r="10"
  //                     stroke="currentColor"
  //                     strokeWidth="4"
  //                   ></circle>
  //                   <path
  //                     className="opacity-75"
  //                     fill="currentColor"
  //                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //                   ></path>
  //                 </svg>
  //                 Sending...
  //               </>
  //             ) : (
  //               "Send Message"
  //             )}
  //           </button>
  //         </form>
  //       )}
  //     </div>
  //   </section>
  // );

  return (
    <section className="relative flex items-center min-h-[85vh] px-4 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
      
      {/* Architectural Grid Background (Matching the Hero/System aesthetic) */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        
        {/* The Glassmorphic Command Module */}
        <div className="relative p-8 sm:p-12 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden gpu-layer group">
          
          {/* Ambient Internal Glow */}
          <div className="absolute -inset-24 bg-linear-to-tr from-primary-500/10 to-transparent blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* 1. SUCCESS STATE (Goal Gradient & Dopamine Hit) */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-[slideDown_0.4s_ease-out]">
              
              {/* 100% Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-500 shadow-[0_0_20px_var(--theme-primary-glow)]" />
              
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-primary-500 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-3xl shadow-sm gpu-layer transform-gpu scale-100 hover:scale-105 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-3">
                Transmission Sent
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                Your message has been securely routed to {targetUser}. Acknowledgment sequence initiated.
              </p>
              
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-3 text-[13px] font-black tracking-widest text-slate-600 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 gpu-layer"
              >
                Initiate New Message
              </button>
            </div>
          ) : (
            
            /* 2. SECURE FORM STATE */
            <div className="animate-[slideDown_0.4s_ease-out]">
              
              {/* Header Anchoring */}
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 shadow-sm gpu-layer cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
                    Secure Uplink
                  </span>
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                  Establish Contact
                </h1>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Direct encrypted channel to {targetUser}. Drop a message for collaborations or inquiries.
                </p>
              </div>

              {/* Cognitive Error Banner */}
              {status === "error" && (
                <div className="flex items-start gap-3 p-4 mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl transform-gpu animate-[slideDown_0.3s_ease-out]">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-red-800 dark:text-red-300 uppercase mb-0.5">Transmission Failed</span>
                    <span className="text-[13px] font-medium text-red-700 dark:text-red-400 leading-snug">
                      {errorMessage}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name Input */}
                  <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
                    <label htmlFor="name" className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                      Identity
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
                    <label htmlFor="email" className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                      Return Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      placeholder="john@route.com"
                      className="w-full px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5 focus-within:text-primary-500 transition-colors">
                  <label htmlFor="message" className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Payload
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="How can we collaborate? Type your message here..."
                    className="w-full px-4 py-4 text-sm font-medium leading-relaxed text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405]/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 resize-y placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
                  ></textarea>
                </div>

                {/* Submit Action: Heavy visual weight, Dynamic Shadow */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg hover:shadow-[0_0_30px_var(--theme-primary-glow)] hover:-translate-y-0.5 text-[14px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 gpu-layer group/btn"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <span>Send Transmission</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );

}

export default Contact;
