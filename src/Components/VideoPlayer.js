import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Typewriter from './Typewriter';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const url = useSelector((state) => state.caption.videoUrl);
  const captions = useSelector((state) => state.caption.captions);
  const [currentCaption, setCurrentCaption] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const activeCaption = captions.find(
          (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime
        );
        if (activeCaption && activeCaption.text !== currentCaption) {
          setCurrentCaption(activeCaption.text);
          setStart(activeCaption.startTime);
          setEnd(activeCaption.endTime);
        } else if (!activeCaption && currentCaption) {
          setCurrentCaption('');
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [captions, currentCaption]);

  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  let captionInterval = end - start;
  let delay = 50; 

  if (currentCaption && start !== null && end !== null) {
    const textLength = currentCaption.length;
    delay = Math.ceil((captionInterval * 1000) / textLength);
  }

  return (
    <div className="video-player-container" style={{ display: !url ? 'none' : '' }}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={true}
        width="100%"
        height="100%"
        playing={isPlaying}
        onPlay={() => handlePlayPause(true)}
        onPause={() => handlePlayPause(false)}
      />
      <div className="captions">
        {currentCaption && (
          <Typewriter
            text={currentCaption}
            isPlaying={isPlaying}
            delay={delay}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
