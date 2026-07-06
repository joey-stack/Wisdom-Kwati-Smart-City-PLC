'use client';

export default function ScrollCTA({ targetId, text, className, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {text}
      {children}
    </button>
  );
}
