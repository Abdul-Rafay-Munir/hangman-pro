// Hangman.jsx
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Hangman = ({ wrongGuessCount }) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Total stages for the hangman animation
  const totalStages = 6;
  
  // Calculate the current stage based on wrong guesses
  const currentStage = Math.min(wrongGuessCount, totalStages);
  
  // Animate the hangman building process
  useEffect(() => {
    if (wrongGuessCount > 0 && animationStage < currentStage) {
      const timer = setTimeout(() => {
        setAnimationStage(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else if (wrongGuessCount === 0) {
      setAnimationStage(0);
    }
  }, [wrongGuessCount, animationStage, currentStage]);

  return (
    <div className="hangman-container">
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 200 200" 
        className="hangman-svg"
      >
        {/* Gallows */}
        <line x1="20" y1="180" x2="100" y2="180" stroke="#F9F4DA" strokeWidth="3" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="#F9F4DA" strokeWidth="3" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="#F9F4DA" strokeWidth="3" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="#F9F4DA" strokeWidth="3" />

        {/* Head - appears at stage 1 */}
        {animationStage >= 1 && (
          <circle 
            cx="120" 
            cy="60" 
            r="20" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            fill="none"
            className="hangman-part"
          />
        )}

        {/* Body - appears at stage 2 */}
        {animationStage >= 2 && (
          <line 
            x1="120" 
            y1="80" 
            x2="120" 
            y2="130" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            className="hangman-part"
          />
        )}

        {/* Left Arm - appears at stage 3 */}
        {animationStage >= 3 && (
          <line 
            x1="120" 
            y1="100" 
            x2="100" 
            y2="120" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            className="hangman-part"
          />
        )}

        {/* Right Arm - appears at stage 4 */}
        {animationStage >= 4 && (
          <line 
            x1="120" 
            y1="100" 
            x2="140" 
            y2="120" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            className="hangman-part"
          />
        )}

        {/* Left Leg - appears at stage 5 */}
        {animationStage >= 5 && (
          <line 
            x1="120" 
            y1="130" 
            x2="100" 
            y2="160" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            className="hangman-part"
          />
        )}

        {/* Right Leg - appears at stage 6 */}
        {animationStage >= 6 && (
          <line 
            x1="120" 
            y1="130" 
            x2="140" 
            y2="160" 
            stroke="#EC5D49" 
            strokeWidth="2" 
            className="hangman-part"
          />
        )}
      </svg>
      
      <div className="hangman-status">
        Wrong guesses: {wrongGuessCount}/6
      </div>
    </div>
  );
};

export default Hangman;