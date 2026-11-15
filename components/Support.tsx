import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import PageShell from './PageShell';
import content from '../content.json';
import { usePageTitle } from '../hooks/usePageTitle';
import { inputClassName, labelClassName, textareaClassName } from '../lib/formStyles';

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
    <PageShell
      eyebrow="Support"
      title="Support"
      width="wide"
      lead="Need help? Have a question or issue? Fill out the form below and we'll get back to you as soon as possible."
    >
      <form onSubmit={handleSubmit} className="max-w-[40rem] space-y-6">
        <div>
          <label htmlFor="name" className={labelClassName}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            autoComplete="name"
            enterKeyHint="next"
            className={inputClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            autoComplete="email"
            autoCapitalize="none"
            inputMode="email"
            enterKeyHint="next"
            className={inputClassName}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClassName}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            required
            enterKeyHint="next"
            className={inputClassName}
            placeholder="What do you need help with?"
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClassName}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={6}
            className={textareaClassName}
            placeholder="Please describe your question or issue in detail..."
          ></textarea>
        </div>

        <p className="flex items-center gap-2 text-[0.8125rem] leading-[1.4] text-ink-3">
          <Mail size={16} aria-hidden="true" />
          <span>We'll respond via email</span>
        </p>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary press" aria-live="polite">
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              <span>Redirecting to Mail...</span>
            </>
          ) : (
            <span>Send Support Request</span>
          )}
        </button>
      </form>
    </PageShell>
  );
};

export default Support;
