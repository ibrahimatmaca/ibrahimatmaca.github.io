import React, { useState } from 'react';
import { Mail, Send, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Aurora from './Aurora';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import content from '../content.json';
import { usePageTitle } from '../hooks/usePageTitle';

const Support: React.FC = () => {
  usePageTitle('Support | İbrahim Atmaca');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct Mailto Link
    const subject = encodeURIComponent(`Support Request: ${formState.subject} - from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    
    const mailtoLink = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
    
    // Slight delay for visual feedback then open mail client
    setTimeout(() => {
        window.location.href = mailtoLink;
        setIsSubmitting(false);
        setFormState({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-svh font-sans text-ink antialiased selection:bg-brand-500/30">
      <Aurora />
      <SiteNav mode="page" />

      <main className="relative">
        <section className="relative flex min-h-svh items-center py-32">
          <div className="container mx-auto w-full max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mb-12 text-center"
            >
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface/70 text-tint backdrop-blur-md">
                  <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">Support</h1>
              </div>
              <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-brand-400 to-violet-400" />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-2">
                Need help? Have a question or issue? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Support Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-line bg-canvas/70 px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-tint focus:outline-none focus:ring-1 focus:ring-tint"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoCapitalize="none"
                    className="w-full rounded-xl border border-line bg-canvas/70 px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-tint focus:outline-none focus:ring-1 focus:ring-tint"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-line bg-canvas/70 px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-tint focus:outline-none focus:ring-1 focus:ring-tint"
                    placeholder="What do you need help with?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-line bg-canvas/70 px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-tint focus:outline-none focus:ring-1 focus:ring-tint resize-none"
                    placeholder="Please describe your question or issue in detail..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-ink-2">
                    <Mail size={16} />
                    <span>We'll respond via email</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`press flex min-h-12 w-full items-center justify-center gap-2 rounded-full py-4 font-bold transition-colors ${
                    isSubmitting
                      ? 'bg-raised text-ink-2'
                      : 'bg-fill text-on-fill shadow-lg shadow-brand-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Redirecting to Mail...</span>
                  ) : (
                    <>
                      Send Support Request <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Support;
