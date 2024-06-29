import React, { useEffect, useState, useRef } from 'react';

const Typewriter = ({ text, isPlaying, delay}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }
      }, delay);
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, displayedText, text, delay, currentIndex]);

  useEffect(() => {
    // Reset typewriter when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
