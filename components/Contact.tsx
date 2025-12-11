import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, XCircle } from 'lucide-react';
import content from '../content.json';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // API endpoint (works with Vercel CLI in dev, or production)
      const apiEndpoint = '/api/send-email';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send message');
      }

      // Success
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || content.contact.form.error);
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative scroll-mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{content.contact.title}</h2>
            <div className="w-20 h-1 bg-brand-500 mb-8"></div>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              {content.contact.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-brand-400 border border-slate-700">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
                  <a href={`mailto:${content.contact.email}`} className="text-gray-400 hover:text-brand-400 transition-colors break-all">
                    {content.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-brand-400 border border-slate-700">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
                  <p className="text-gray-400">{content.contact.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <h3 className="text-white font-semibold mb-4">{content.contact.socialTitle}</h3>
               <div className="flex gap-4">
                  <a href="https://github.com/ibrahimatmaca" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-brand-500 hover:text-white transition-all border border-slate-700">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/ibrahimatmaca" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-brand-500 hover:text-white transition-all border border-slate-700">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/com.ibrahimatmaca" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-brand-500 hover:text-white transition-all border border-slate-700">
                    <Instagram size={20} />
                  </a>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-500/20 transition-colors duration-500"></div>
             
             <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{content.contact.form.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{content.contact.form.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{content.contact.form.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={20} />
                    <span className="text-green-400 text-sm font-medium">
                      {content.contact.form.sent || 'Message sent successfully!'}
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                    <XCircle className="text-red-400" size={20} />
                    <span className="text-red-400 text-sm font-medium">
                      {errorMessage}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isSubmitting 
                      ? 'bg-slate-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span>{content.contact.form.sending || 'Sending...'}</span>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    <>
                      {content.contact.form.button} <Send size={18} />
                    </>
                  )}
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;