import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoggedInHomePage = () => {
  useEffect(() => {
    const letters = document.querySelectorAll('.letter');

    const setInitialDarkState = () => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const x = rect.width / 2;
        const y = rect.height / 2;
        letter.style.setProperty('--x', `${x}px`);
        letter.style.setProperty('--y', `${y}px`);
        letter.style.clipPath = `circle(0% at ${x}px ${y}px)`;
      });
    };

    setInitialDarkState();

    const handleMouseMove = (event) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        letter.style.setProperty('--x', `${x}px`);
        letter.style.setProperty('--y', `${y}px`);
        letter.style.clipPath = `circle(60% at ${x}px ${y}px)`; // Increase the percentage to make the circle larger
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
        <div className="button-container">
          <Link to="/lumen">
            <button className="home-button home-sign-in-button">Message Lumen</button>
          </Link>
          <Link to="/about-us">
            <button className="home-button learn-more-button">Learn More</button>
          </Link>
        </div>
        <p className="access-key-note">An access key is required to access Lumen.</p>
      </div>
    </div>
  );
};

export default LoggedInHomePage;