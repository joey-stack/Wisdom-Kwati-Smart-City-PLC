'use client';
import { useEffect } from 'react';

/**
 * Loads Font Awesome asynchronously AFTER the page is interactive.
 * Keeps it completely off the critical rendering path.
 *
 * Previously, a synchronous <link rel="stylesheet"> in <head> forced
 * the browser to download and parse the FA stylesheet (+ webfonts) before
 * it could paint any pixel — a guaranteed 300-600 ms FCP penalty.
 */
export default function FontAwesomeLoader() {
    useEffect(() => {
        // Avoid duplicate injection on HMR / route changes
        if (document.getElementById('fa-stylesheet')) return;

        const link = document.createElement('link');
        link.id = 'fa-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        link.crossOrigin = 'anonymous';
        link.referrerPolicy = 'no-referrer';
        document.head.appendChild(link);
    }, []);

    return null;
}
