import { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioSrc, play, pause }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      audio.play();
    };

    const pauseAudio = () => {
      audio.pause();
    };

    return () => {
      audio.pause(); // Pause audio when the component unmounts
    };
  }, []);

  useEffect(()=>{
    if(play !== null && play !== undefined){
      audioRef.current.play()
    }
  },[play])

  useEffect(()=>{
    if(pause !== null && pause !== undefined){
      audioRef.current.pause()
    }
  },[pause])

  return (
    <div>
      <audio ref={audioRef}>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
{/* 
      <button onClick={() => audioRef.current.play()}>Play</button>
      <button onClick={() => audioRef.current.pause()}>Pause</button> */}
    </div>
  );
};

export default AudioPlayer;