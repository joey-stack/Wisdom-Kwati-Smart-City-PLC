'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ConsultationModal() {
    const pathname = usePathname();
    
    // Form field states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [serviceInterest, setServiceInterest] = useState('');
    const [consultationMethod, setConsultationMethod] = useState('');
    const [date, setDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [message, setMessage] = useState('');
    
    // Assigned Advisor state (passed via custom event)
    const [advisorEmail, setAdvisorEmail] = useState('');
    const [advisorName, setAdvisorName] = useState('');

    // UI Pipeline states
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOpen = (e) => {
            const { email: advEmail, name: advName } = e.detail || {};
            setAdvisorEmail(advEmail || '');
            setAdvisorName(advName || '');
            
            const overlay = document.getElementById('consultationModal');
            if (overlay) {
                overlay.classList.add('active');
            }
            if (typeof window !== 'undefined' && window.lenis) {
                window.lenis.stop();
            }
            document.body.classList.add('no-scroll');
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('open-consultation-modal', handleOpen);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('open-consultation-modal', handleOpen);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const handleClose = () => {
        const overlay = document.getElementById('consultationModal');
        if (overlay) {
            overlay.classList.remove('active');
        }
        if (typeof window !== 'undefined' && window.lenis) {
            if (!document.body.classList.contains('menu-active') && !document.getElementById('siteVisitModal')?.classList.contains('active')) {
                window.lenis.start();
            }
        }
        document.body.classList.remove('no-scroll');
        setSuccess(false);
        setError('');
    };

    const handleOverlayClick = (e) => {
        if (e.target.id === 'consultationModal') {
            handleClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phone || !email || !serviceInterest || !consultationMethod || !date || !preferredTime) {
            setError('Please fill out all required fields.');
            return;
        }

        setError('');
        setSubmitting(true);
        setSuccess(false);

        const targetEmail = advisorEmail || '';
        const targetName = advisorName || '';

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'consultation',
                    name,
                    phone,
                    email,
                    serviceInterest,
                    consultationMethod,
                    preferredDate: date,
                    preferredTime,
                    advisorEmail: targetEmail,
                    advisorName: targetName,
                    message: message || ''
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit consultation booking.');
            }

            // 2. Transition state to success
            setSuccess(true);

            // Reset form fields
            setName('');
            setPhone('');
            setEmail('');
            setServiceInterest('');
            setConsultationMethod('');
            setDate('');
            setPreferredTime('');
            setMessage('');
            setAdvisorEmail('');
            setAdvisorName('');

            // 3. Close the modal gracefully after showing success check
            setTimeout(() => {
                handleClose();
            }, 2500);

        } catch (err) {
            console.error('Failed to submit consultation booking:', err);
            setError(err.message || 'Booking submission failed. Please check your network and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Consultation Modal */}
            <div className="consultation-modal-overlay" id="consultationModal" role="dialog" aria-modal="true" aria-label="Book a consultation">
                <div className="consultation-modal-container">
                    <button onClick={handleClose} className="consultation-modal-close" aria-label="Close Modal">&times;</button>
                    <div className="form-card" style={{ boxShadow: 'none', border: 'none', padding: '40px', margin: '0', width: '100%' }}>
                        <h2 className="form-title" style={{ marginBottom: '6px', fontSize: '24px' }}>Book a Consultation</h2>
                        {advisorName ? (
                            <p style={{ fontFamily: 'var(--font-main)', fontSize: '13px', color: 'var(--accent-green)', fontWeight: '600', marginBottom: '24px' }}>
                                Assigned Advisor: {advisorName}
                            </p>
                        ) : (
                            <p style={{ fontFamily: 'var(--font-main)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                                Schedule a meeting with our smart city real estate advisors.
                            </p>
                        )}
                        
                        {error && (
                          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', fontSize: '13px', borderRadius: '4px', marginBottom: '20px', fontFamily: 'var(--font-main)' }}>
                            {error}
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="consult-name">NAME</label>
                                    <input 
                                        type="text" 
                                        id="consult-name" 
                                        name="name" 
                                        placeholder="Jane Smith" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={submitting || success}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="consult-phone">PHONE</label>
                                    <input 
                                        type="tel" 
                                        id="consult-phone" 
                                        name="phone" 
                                        placeholder="+234 810 001 5555" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={submitting || success}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="consult-email">EMAIL</label>
                                <input 
                                    type="email" 
                                    id="consult-email" 
                                    name="email" 
                                    placeholder="jane@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={submitting || success}
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="consult-interest">SERVICE INTEREST</label>
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <select 
                                            id="consult-interest" 
                                            name="serviceInterest" 
                                            required 
                                            value={serviceInterest}
                                            onChange={(e) => setServiceInterest(e.target.value)}
                                            disabled={submitting || success}
                                            style={{ width: '100%', padding: '16px 20px', paddingRight: '45px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease', appearance: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="" disabled>Select Service</option>
                                            <option value="Buy Smart Villa / House Type">Buy Smart Villa / House Type</option>
                                            <option value="Land Purchase / Plots">Land Purchase / Plots</option>
                                            <option value="Real Estate Investment Options">Real Estate Investment Options</option>
                                            <option value="Joint Venture Opportunities">Joint Venture Opportunities</option>
                                            <option value="Property Management">Property Management</option>
                                            <option value="General Consultation">General Consultation</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="consult-method">PREFFERED METHOD</label>
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <select 
                                            id="consult-method" 
                                            name="consultationMethod" 
                                            required 
                                            value={consultationMethod}
                                            onChange={(e) => setConsultationMethod(e.target.value)}
                                            disabled={submitting || success}
                                            style={{ width: '100%', padding: '16px 20px', paddingRight: '45px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease', appearance: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="" disabled>Select Method</option>
                                            <option value="Phone Call">Phone Call</option>
                                            <option value="Zoom Video Call">Zoom Video Call</option>
                                            <option value="Google Meet Video Call">Google Meet Video Call</option>
                                            <option value="In-Person Meeting (Office)">In-Person Meeting (Office)</option>
                                            <option value="WhatsApp Chat">WhatsApp Chat</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="consult-date">PREFERRED DATE</label>
                                    <input 
                                        type="date" 
                                        id="consult-date" 
                                        name="date" 
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        disabled={submitting || success}
                                        required 
                                        style={{ width: '100%', padding: '16px 20px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease' }} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="consult-time">PREFERRED TIME</label>
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <select 
                                            id="consult-time" 
                                            name="preferredTime" 
                                            required 
                                            value={preferredTime}
                                            onChange={(e) => setPreferredTime(e.target.value)}
                                            disabled={submitting || success}
                                            style={{ width: '100%', padding: '16px 20px', paddingRight: '45px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease', appearance: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="" disabled>Select Time Slot</option>
                                            <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                                            <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                                            <option value="Late Afternoon (3:00 PM - 5:00 PM)">Late Afternoon (3:00 PM - 5:00 PM)</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="consult-message">ADDITIONAL NOTES (OPTIONAL)</label>
                                <textarea 
                                    id="consult-message" 
                                    name="message" 
                                    rows="2" 
                                    placeholder="Tell us more about your request or questions..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={submitting || success}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-btn" 
                                disabled={submitting || success}
                                style={{ 
                                    width: '100%', 
                                    marginTop: '10px',
                                    backgroundColor: success ? '#10B981' : '',
                                    borderColor: success ? '#10B981' : '',
                                }}
                            >
                                <div className="flip-text">
                                    <span>
                                        {success ? '✓ CONSULTATION SECURED' : submitting ? 'BOOKING CONSULTATION...' : 'SUBMIT REQUEST'}
                                    </span>
                                    <span aria-hidden="true">
                                        {success ? '✓ CONSULTATION SECURED' : submitting ? 'BOOKING CONSULTATION...' : 'SUBMIT REQUEST'}
                                    </span>
                                </div>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
