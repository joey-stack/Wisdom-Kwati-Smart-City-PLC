import Link from 'next/link';

export default function SiteVisitModal() {
    return (
        <>
            {/* Site Visit Modal */}
            <div className="site-visit-modal-overlay" id="siteVisitModal">
                <div className="site-visit-modal-container">
                    <button className="site-visit-modal-close" aria-label="Close Modal">&times;</button>
                    <div className="form-card" style={{ boxShadow: 'none', border: 'none', padding: '40px', margin: '0', width: '100%' }}>
                        <h3 className="form-title" style={{ marginBottom: '12px', fontSize: '24px' }}>Request a Site Visit</h3>
                        <p style={{ fontFamily: 'var(--font-main)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>Fill out the details below and our team will get in touch to schedule your visit.</p>
                        
                        <form action="mailto:hello@wisdomkwatismartcity.com" method="post" encType="text/plain" className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="modal-name">NAME</label>
                                    <input type="text" id="modal-name" name="name" placeholder="Jane Smith" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modal-phone">PHONE</label>
                                    <input type="tel" id="modal-phone" name="phone" placeholder="+234 810 001 5555" required />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="modal-email">EMAIL</label>
                                <input type="email" id="modal-email" name="email" placeholder="jane@example.com" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="modal-estate">SELECT ESTATE</label>
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <select id="modal-estate" name="estate" required defaultValue="" style={{ width: '100%', padding: '16px 20px', paddingRight: '45px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease', appearance: 'none', cursor: 'pointer' }}>
                                            <option value="" disabled>Select an Estate</option>
                                            <optgroup label="ABUJA">
                                                <option value="Beverly Hills, Kuje">Beverly Hills, Kuje</option>
                                                <option value="Ellington Villa, Mabushi">Ellington Villa, Mabushi</option>
                                                <option value="Kwati City, Maitama II">Kwati City, Maitama II</option>
                                                <option value="Lakeside View, Kuje">Lakeside View, Kuje</option>
                                                <option value="Murg City, Katampe Ext.">Murg City, Katampe Ext.</option>
                                                <option value="Murg City Exclusive, Katampe Ext.">Murg City Exclusive, Katampe Ext.</option>
                                                <option value="Nimi Hills, Guzape">Nimi Hills, Guzape</option>
                                                <option value="Palm Haven, Apo Tafyi">Palm Haven, Apo Tafyi</option>
                                                <option value="Royal City, Kuje">Royal City, Kuje</option>
                                                <option value="Usulo City, Karu">Usulo City, Karu</option>
                                                <option value="Wisdom Kwati Smart City, Karsana">Wisdom Kwati Smart City, Karsana</option>
                                            </optgroup>
                                            <optgroup label="LAGOS">
                                                <option value="Epe Smart City, Epe">Epe Smart City, Epe</option>
                                            </optgroup>
                                            <optgroup label="PORT HARCOURT">
                                                <option value="Garden City Estate, Port Harcourt">Garden City Estate, Port Harcourt</option>
                                                <option value="PH Rumu-olumeni, Port Harcourt">PH Rumu-olumeni, Port Harcourt</option>
                                            </optgroup>
                                            <optgroup label="YOLA">
                                                <option value="Yola Heritage, Yola">Yola Heritage, Yola</option>
                                            </optgroup>
                                            <optgroup label="KADUNA">
                                                <option value="Kaduna Smart District, Kaduna">Kaduna Smart District, Kaduna</option>
                                            </optgroup>
                                        </select>
                                        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modal-date">PREFERRED DATE</label>
                                    <input type="date" id="modal-date" name="date" required style={{ width: '100%', padding: '16px 20px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease, background-color 0.3s ease' }} />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="modal-message">MESSAGE (OPTIONAL)</label>
                                <textarea id="modal-message" name="message" rows="3" placeholder="Any specific property or questions?"></textarea>
                            </div>

                            <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '10px' }}>
                                <div className="flip-text">
                                    <span>SUBMIT REQUEST</span>
                                    <span aria-hidden="true">SUBMIT REQUEST</span>
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
