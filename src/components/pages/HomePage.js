import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const letters = document.querySelectorAll('.letter');
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        letter.style.setProperty('--x', `${x}px`);
        letter.style.setProperty('--y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="background"></div>
      <div className="content">
        <h1 className="lumen-title">
          {'LUMEN'.split('').map((letter, index) => (
            <span key={index} className="letter" data-letter={letter}>
              {letter}
            </span>
          ))}
        </h1>
        <button className="sign-in-button">Sign In</button>
      </div>
    </div>
  );
};

export default HomePage;
