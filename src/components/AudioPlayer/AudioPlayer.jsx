import React, { useState, useRef, useEffect, useCallback } from "react";
import "./AudioPlayer.css";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import { Controls } from "../Controls/Controls";
import WaveAnimation from "../WaveAnimation/WaveAnimation";

export const AudioPlayer = ({
  currentTrack,

  currentIdx,
  setCurrentIdx,
  total,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = total[currentIdx]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists?.push(artist.name);
  });
  const handleNext = useCallback(() => {
    if (currentIdx < total.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else setCurrentIdx(0);
  }, [currentIdx, total.length, setCurrentIdx]);
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000); // Corrected array syntax error in setInterval
  }, [handleNext]);

  useEffect(() => {
    const togglePlayPause = async () => {
      if (isPlaying) {
        try {
          await audioRef.current.play();
          startTimer();
        } catch (error) {
          console.error("Error playing the audio", error);
        }
      } else {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      }
    };

    if (audioRef.current.src) {
      togglePlayPause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        await audioRef.current.play();
        startTimer();
      } catch (error) {
        console.error("Error playing the audio", error);
      }
    };

    if (isReady.current) {
      playAudio();
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [currentIdx, audioSrc, startTimer]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handlePrev = () => {
    if (currentIdx - 1 < 0) setCurrentIdx(total.length - 1);
    else setCurrentIdx(currentIdx - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#96312c"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists?.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>

            <WaveAnimation isPlaying={true} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};
