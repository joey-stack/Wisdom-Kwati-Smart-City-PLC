import { resolveMediaUrl } from '../src/lib/media.js';

const url = 'https://drive.google.com/file/d/1DHUq42N_NKE3A0NEgG0p9HUuwTBuMSn4/view?usp=drive_link';
console.log('Original:', url);
console.log('Resolved:', resolveMediaUrl(url));
process.exit(0);
