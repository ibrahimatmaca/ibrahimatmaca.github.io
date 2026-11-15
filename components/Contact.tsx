import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, Github, Instagram, Linkedin, Loader2 } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useLanguage } from '../hooks/useLanguage';
import { inputClassName, labelClassName, textareaClassName } from '../lib/formStyles';

const SOCIAL_LINKS = [
  { Icon: Github, href: 'https://github.com/ibrahimatmaca', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/ibrahimatmaca', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/com.ibrahimatmaca', label: 'Instagram' },
];

type Status = 'idle' | 'invalid' | 'submitting' | 'success';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const contact = t.contact;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  const resetTimer = useRef<number | undefined>(undefined);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(
    () => () => {
      window.clearTimeout(copyTimer.current);
      window.clearTimeout(resetTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // Clipboard access can be blocked. The address is still a mailto link.
      window.location.href = `mailto:${contact.email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.message.trim()) {
      setStatus('invalid');
      return;
    }

    setStatus('submitting');
    const subject = encodeURIComponent(`Contact from ${formState.name}`);
    let body = formState.message;
    if (formState.email.trim()) {
      body += `\n\n---\nEmail: ${formState.email}`;
    }

    // A short pause so the button state is seen before the mail app takes over.
    window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      resetTimer.current = window.setTimeout(() => {
        setFormState({ name: '', email: '', message: '' });
        setStatus('idle');
      }, 4000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (status === 'invalid') setStatus('idle');
  };

  const invalid = status === 'invalid';

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 bg-surface py-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">
        <SectionHeading index="06" kicker={contact.kicker} title={contact.title} titleId="contact-title" description={contact.description} />

        <Reveal className="mb-16 lg:mb-24">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={contact.copyEmail}
            className="press inline-flex min-h-11 items-center gap-4 text-left font-display text-[clamp(1.125rem,5.2vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink underline decoration-tint decoration-2 underline-offset-[0.15em] [overflow-wrap:anywhere]"
          >
            {contact.email}
            {copied && <Check size={32} aria-hidden="true" className="shrink-0" />}
          </button>
          <p aria-live="polite" className="mt-3 min-h-[1.4em] font-mono text-[0.8125rem] leading-[1.4] text-ink-2">
            {copied ? contact.copied : contact.copyEmail}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {status === 'success' ? (
              <div role="status" className="max-w-[40rem] border-t border-line pt-6">
                <h3 ref={successRef} tabIndex={-1} className="flex items-center gap-3 font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink outline-none">
                  <Check size={28} aria-hidden="true" />
                  {contact.form.success}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="max-w-[40rem] space-y-6">
                <div>
                  <label htmlFor="name" className={labelClassName}>
                    {contact.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    aria-invalid={invalid && !formState.name.trim()}
                    aria-describedby={invalid ? 'contact-error' : undefined}
                    autoComplete="name"
                    enterKeyHint="next"
                    className={inputClassName}
                    placeholder={contact.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClassName}>
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
                    inputMode="email"
                    enterKeyHint="next"
                    className={inputClassName}
                    placeholder={contact.form.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelClassName}>
                    {contact.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    aria-invalid={invalid && !formState.message.trim()}
                    aria-describedby={invalid ? 'contact-error' : undefined}
                    rows={5}
                    enterKeyHint="send"
                    className={textareaClassName}
                    placeholder={contact.form.messagePlaceholder}
                  />
                  <div aria-live="polite">
                    {invalid && (
                      <p id="contact-error" className="mt-2 flex items-center gap-2 text-[0.8125rem] font-semibold leading-[1.4] text-danger">
                        <AlertCircle size={16} aria-hidden="true" />
                        {contact.form.error}
                      </p>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary press">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      {contact.form.sending}
                    </>
                  ) : (
                    contact.form.button
                  )}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              <div className="border-b border-line py-4">
                <dt className="font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">{contact.locationLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] leading-[1.6] text-ink">{contact.location}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">{contact.availabilityLabel}</dt>
                <dd className="mt-2 flex items-center gap-2 text-[1.0625rem] leading-[1.6] text-ink">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full border border-ink-2" />
                  {contact.availability}
                </dd>
              </div>
            </dl>
            <h3 className="mb-1 mt-8 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">{contact.socialTitle}</h3>
            <ul>
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-link flex w-full gap-3 text-[1.0625rem]">
                    <Icon size={20} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
