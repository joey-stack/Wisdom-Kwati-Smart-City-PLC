'use client';
import { useState } from 'react';

export default function ContactForm({ buttonClassName = 'submit-btn', defaultPhonePlaceholder = '+234 810 001 5555' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Name, Email, and Message are required.');
      return;
    }

    setError('');
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'general',
          name,
          phone,
          email,
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message. Please try again.');
      }

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Contact Form submission error:', err);
      setError(err.message || 'Failed to submit inquiry. Check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {success && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '14px 18px', fontSize: '14px', borderRadius: '6px', marginBottom: '24px', fontFamily: 'var(--font-main)', lineHeight: '1.4' }}>
          ✓ Your message has been sent successfully. Our team will get back to you shortly!
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '14px 18px', fontSize: '14px', borderRadius: '6px', marginBottom: '24px', fontFamily: 'var(--font-main)', lineHeight: '1.4' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="form-name">NAME</label>
            <input
              type="text"
              id="form-name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-phone">PHONE</label>
            <input
              type="tel"
              id="form-phone"
              placeholder={defaultPhonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="form-email">EMAIL</label>
          <input
            type="email"
            id="form-email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="form-message">MESSAGE</label>
          <textarea
            id="form-message"
            rows="5"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className={buttonClassName}
          disabled={submitting}
          style={{
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          <div className="flip-text">
            <span>{submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
            <span aria-hidden="true">{submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
          </div>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </form>
    </div>
  );
}
