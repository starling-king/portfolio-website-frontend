import React, { useState } from 'react';
import contactMessageService from '../Services/contact_messages.Services';
import { useParams } from 'react-router-dom';

function Contact() {
 
  const { username } = useParams();
  const targetUser = username || "ayush";

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

 
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setStatus('loading');
    setErrorMessage('');

    try {
        
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error("All fields are required.");
        }

        
        await contactMessageService.SavetheDataOfForm({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            username: targetUser 
        });

        
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

    } catch (error) {
        setStatus('error');
        setErrorMessage(error?.message || "Something went wrong. Please try again.");
    }
  };

  
  return (
    <section className="px-4 py-16 mx-auto max-w-7xl">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Get in Touch</h1>
          <p className="mt-4 text-slate-600">
            Have a question or want to work together? Drop a message for {targetUser}.
          </p>
        </div>

        {/* Success Message UI */}
        {status === 'success' ? (
          <div className="p-6 text-center bg-green-50 rounded-xl border border-green-100">
            <svg className="w-12 h-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-green-900">Message Sent!</h3>
            <p className="mt-2 text-green-700">Thanks for reaching out. We'll get back to you soon.</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
                Send Another Message
            </button>
          </div>
        ) : (
          
          /* The Form UI */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message UI */}
            {status === 'error' && (
              <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none disabled:bg-slate-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none disabled:bg-slate-50"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 mt-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors outline-none resize-y disabled:bg-slate-50"
                placeholder="How can we collaborate?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center items-center px-6 py-3 text-base font-medium text-white transition-colors bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;