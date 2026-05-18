'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import '@/styles/admin.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();

  // Route protection - redirect to dashboard if already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/admin/dashboard');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSigningIn(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Authentication failed:', err);
      // Map error codes to friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setError('The email address format is invalid.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid administrative credentials.');
          break;
        case 'auth/user-disabled':
          setError('This administrator account has been disabled.');
          break;
        default:
          setError('Authentication failed. Please verify your connection.');
      }
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-skeleton-screen">
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-logo-area">
          <h2 className="admin-logo-title">Wisdom Kwati</h2>
          <span className="admin-logo-subtitle">CMS Portal v1.0</span>
        </div>

        {error && (
          <div className="admin-error-banner">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-email">
              Administrative Email
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="e.g. admin@wksmartcity.com"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={signingIn}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-password">
              Security Password
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••••••"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={signingIn}
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn"
            disabled={signingIn}
          >
            {signingIn ? 'Verifying Gateway...' : 'Authenticate Access'}
          </button>
        </form>
      </div>
    </div>
  );
}
