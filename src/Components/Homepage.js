import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoUrl, addCaption, editCaption, setCurrentCaption } from '../store';
import VideoPlayer from './VideoPlayer';
import CaptionForm from './CaptionForm';
import './Homepage.css';
import { ReactComponent as Edit } from '../utils/edit.svg';

const Homepage = () => {
  const videoUrl = useSelector((state) => state.caption.videoUrl);
  const captions = useSelector((state) => state.caption.captions);
  const currentCaption = useSelector((state) => state.caption.currentCaption);
  const dispatch = useDispatch();

  const handleEditClick = (caption) => {
    dispatch(setCurrentCaption(caption));
  };

  return (
    <div className="homepage">
      <h1>Caption Maker</h1>
      <h4 className={videoUrl ? 'caption-list-hidden' : 'add-video-link'}>Add a video link , enter captions and set their timestamps !</h4>
      <VideoPlayer url={videoUrl} captions={captions} className='videoPlayer' />
      <div className='primarycontainer'>
        <CaptionForm
          addCaption={(caption) => dispatch(addCaption(caption))}
          editCaption={(caption) => dispatch(editCaption(caption))}
          currentCaption={currentCaption}
          captions={captions}
          videoUrl={videoUrl}
          setVideoUrl={(url) => dispatch(setVideoUrl(url))}
        />
         <div className={videoUrl ? 'caption-list' :'caption-list-hidden'} style={{ marginBottom: videoUrl ? '20%' : '8rem' }}>
          <div className='caption-header'>
            <h4>Captions</h4>
            <h4>Duration (secs)</h4>
            <h4>Edit</h4>
          </div>
          {captions.map((caption) => (
            <div key={caption.id} className="caption-item">
              <p>{caption.text}</p>
              <p>{caption.startTime} - {caption.endTime}</p>
              <Edit onClick={() => handleEditClick(caption)} className='edit' />
            </div>
          ))}
        </div>

      </div>
      <footer>
        <p>Made By: Dhruv Dehlan</p>
        <p>dehlandhruv@gmail.com</p>
      </footer>
    </div>
  );
};

export default Homepage;
