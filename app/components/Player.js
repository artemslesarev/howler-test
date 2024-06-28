import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";

const Player = ({ category, value }) => {
  const paths = {
    test: {
      test1: ["1.mp3", "2.mp3"], // change the music
    },
  };

  const [src1, setSrc1] = useState(paths.test.test1[0]);
  const [src2, setSrc2] = useState(paths.test.test1[1]);

  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const [volume1, setVolume1] = useState(1.0); // Start with full volume
  const [volume2, setVolume2] = useState(0.0); // Start with zero volume

  const [duration1, setDuration1] = useState(0); // To hold the duration of the first track
  const [crossfading, setCrossfading] = useState(false);

  const howler1Ref = useRef(null);
  const howler2Ref = useRef(null);

  const handleLoad1 = () => {
    if (howler1Ref.current) {
      setDuration1(howler1Ref.current.duration());
    }
  };

  const crossfade = () => {
    setCrossfading(true);
    setIsPlaying2(true);

    const fadeDuration = 10000;
    const interval = 500;
    const volumeStep = 0.05;

    const fadeInterval = setInterval(() => {
      setVolume1((prev) => {
        const newVolume = prev - volumeStep;
        return newVolume > 0 ? newVolume : 0;
      });
      setVolume2((prev) => {
        const newVolume = prev + volumeStep;
        return newVolume < 1 ? newVolume : 1;
      });
    }, interval);

    setTimeout(() => {
      setVolume1(0.0);
      setVolume2(1.0);
      clearInterval(fadeInterval);
      setIsPlaying1(false);
      setCrossfading(false);
    }, fadeDuration);
  };

  useEffect(() => {
    if (duration1 > 0 && !crossfading) {
      const timeout = setTimeout(() => {
        crossfade();
      }, duration1 * 1000 - 10000);

      return () => clearTimeout(timeout);
    }
  }, [duration1, crossfading]);

  console.log("volume1", volume1);
  console.log("volume2", volume2);

  return (
    <>
      <ReactHowler
        src={src1}
        playing={isPlaying1}
        volume={volume1}
        onLoad={handleLoad1}
        ref={howler1Ref}
      />
      <ReactHowler
        src={src2}
        playing={isPlaying2}
        volume={volume2}
        ref={howler2Ref}
      />
    </>
  );
};

export default Player;
