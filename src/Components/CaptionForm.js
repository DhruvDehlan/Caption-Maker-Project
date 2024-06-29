// CaptionForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoUrl, addCaption, editCaption } from '../store';
import './CaptionForm.css';

const CaptionForm = ({ currentCaption }) => {
  const dispatch = useDispatch();
  const videoUrl = useSelector((state) => state.caption.videoUrl);
  const captions = useSelector((state) => state.caption.captions);
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentCaption && videoUrl) {
      setText(currentCaption.text);
      setStartTime(currentCaption.startTime);
      setEndTime(currentCaption.endTime);
      setIsEditing(true);
    } else {
      setText('');
      setStartTime('');
      setEndTime('');
      setIsEditing(false);
    }
  }, [currentCaption]);

  const validateTimestamps = () => {
    const startTimeNum = parseFloat(startTime);
    const endTimeNum = parseFloat(endTime);

    if (!startTimeNum || !endTimeNum || startTimeNum >= endTimeNum) {
      setError('Start time must be less than end time.');
      return false;
    }

    if (!isEditing) {
      const lastCaption = captions[captions.length - 1];
      if (lastCaption && lastCaption.endTime >= startTimeNum) {
        setError('Start time must be greater than the end time of the previous caption.');
        return false;
      }
    } else {
      const currentIndex = captions.findIndex((caption) => caption.id === currentCaption.id);
      if (currentIndex > 0) {
        const previousCaption = captions[currentIndex - 1];
        if (startTimeNum <= previousCaption.endTime) {
          setError('Start time must be greater than the end time of the previous caption.');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTimestamps()) return;

    const newCaption = {
      id: isEditing ? currentCaption.id : null,
      text,
      startTime: parseFloat(startTime),
      endTime: parseFloat(endTime),
    };
    if (isEditing) {
      dispatch(editCaption(newCaption));
    } else {
      dispatch(addCaption(newCaption));
    }
    setText('');
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className='captionForm'>
      <input
        className='urlText'
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => dispatch(setVideoUrl(e.target.value))}
      />
      <textarea
        className='captionText'
        placeholder="Enter caption text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <input
          className='startTime'
          type="text"
          placeholder="Start time (seconds)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="text"
          className='endTime'
          placeholder="End time (seconds)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">{isEditing ? 'Update Caption' : 'Add Caption'}</button>
    </form>
  );
};

export default CaptionForm;
