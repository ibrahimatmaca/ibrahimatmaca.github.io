import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Github, Instagram, Linkedin, Mail, MapPin, Send, XCircle } from 'lucide-react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../hooks/useLanguage';

const inputClassName =
  'w-full rounded-xl border border-line bg-canvas/70 px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-tint focus:outline-none focus:ring-1 focus:ring-tint';
const socialClassName =
  'press flex h-11 w-11 items-center justify-center rounded-full border border-line bg-raised text-ink-2 transition-colors hover:bg-fill hover:text-on-fill';

const SOCIAL_LINKS = [
  { Icon: Github, href: 'https://github.com/ibrahimatmaca', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/ibrahimatmaca', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/com.ibrahimatmaca', label: 'Instagram' },
];

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const contact = t.contact;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // Clipboard access can be blocked. The address is still visible to copy by hand.
      return;
    }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    const subject = encodeURIComponent(`Contact from ${formState.name}`);
    let body = formState.message;
    if (formState.email.trim()) {
      body += `\n\n---\nEmail: ${formState.email}`;
    }

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setSubmitStatus('success');

    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading kicker={contact.kicker} title={contact.title} description={contact.description} />

        <div className="grid grid-cols-1 items-start gap-4 md:gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <SpotlightCard>
              <div className="space-y-6 p-6 sm:p-8">
                <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/60 py-1.5 pl-3 pr-4 text-sm font-medium text-ink">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  {contact.availability}
                </p>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-tint">
                    <Mail size={22} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-lg font-semibold text-ink">{contact.emailLabel}</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex min-h-11 items-center break-all text-ink-2 transition-colors hover:text-tint"
                    >
                      {contact.email}
                    </a>
                    <div>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="press mt-1 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink hover:bg-raised"
                      >
                        {copied ? <Check size={16} className="text-emerald-500" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                        <span aria-live="polite">{copied ? contact.copied : contact.copyEmail}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-tint">
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-ink">{contact.locationLabel}</h3>
                    <p className="text-ink-2">{contact.location}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-ink">{contact.socialTitle}</h3>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={socialClassName}>
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <SpotlightCard>
              <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 lg:p-10">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-2">
                    {contact.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={inputClassName}
                    placeholder={contact.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-2">
                    {contact.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    autoComplete="email"
                    autoCapitalize="none"
                    className={inputClassName}
                    placeholder={contact.form.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-2">
                    {contact.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClassName} resize-none`}
                    placeholder={contact.form.messagePlaceholder}
                  />
                </div>

                <div aria-live="polite" aria-atomic="true">
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-600 dark:text-green-400" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <motion.path d="m8 12 3 3 5-6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }} />
                        </svg>
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">{contact.form.success}</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
                      >
                        <XCircle className="shrink-0 text-red-600 dark:text-red-400" size={20} aria-hidden="true" />
                        <span className="text-sm font-medium text-red-700 dark:text-red-400">{contact.form.error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Magnetic>
                  <button
                    type="submit"
                    className="press flex min-h-12 items-center justify-center gap-2 rounded-full bg-fill px-10 py-3 font-bold text-on-fill shadow-lg shadow-brand-500/25"
                  >
                    {contact.form.button} <Send size={18} aria-hidden="true" />
                  </button>
                </Magnetic>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
