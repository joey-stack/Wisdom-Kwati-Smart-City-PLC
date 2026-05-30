'use client';
import { useEffect } from 'react';

/**
 * Loads Font Awesome asynchronously AFTER the browser is idle.
 * Uses requestIdleCallback + media="print" swap trick to keep
 * the stylesheet completely off the critical rendering path.
 */
export default function FontAwesomeLoader() {
    useEffect(() => {
        // Avoid duplicate injection on HMR / route changes
        if (document.getElementById('fa-stylesheet')) return;

        const loadFA = () => {
            const link = document.createElement('link');
            link.id = 'fa-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            link.crossOrigin = 'anonymous';
            link.referrerPolicy = 'no-referrer';
            // Load as print media so it doesn't block rendering
            link.media = 'print';
            // Switch to 'all' once loaded — icons appear without blocking paint
            link.onload = function() { this.media = 'all'; };
            document.head.appendChild(link);
        };

        // Defer until browser is idle (falls back to 200ms timeout)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadFA, { timeout: 3000 });
        } else {
            setTimeout(loadFA, 200);
        }
    }, []);

    return null;
}

