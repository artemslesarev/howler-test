import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';

const Player = ({ category, value }) => {
  const paths = {
    test: {
      test1: [
          'https://storage.yandexcloud.net/izberbash-sounds/bat%20solo.mp3',
          'https://storage.yandexcloud.net/izberbash-sounds/calm%20rare%20birds%20sfx.mp3'
      ],
    }
  };



  const [src1, setSrc1] = useState('https://storage.yandexcloud.net/izberbash-sounds/bat%20solo.mp3');
  const [src2, setSrc2] = useState('https://storage.yandexcloud.net/izberbash-sounds/calm%20rare%20birds%20sfx.mp3');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [volume1, setVolume1] = useState(0.2);
  const [volume2, setVolume2] = useState(0);
  const [count, setCount] = useState(0);

  const fadeVolume = (start, end, duration, setVolume) => {
    const steps = 200;
    const stepDuration = duration / steps;
    const stepChange = (end - start) / steps;
    
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newVolume = start + stepChange * currentStep;
      setVolume(newVolume);

      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  useEffect(() => {
    const fetchAndToggleAudio = async () => {
      const subCat = 'test1'
      //value > 15 ? 'strongWind' : 'softWind';
      const randomSrc = paths[category][subCat][Math.floor(Math.random() * paths[category][subCat].length)];

      setCount(prevCount => prevCount + 1);
      // console.log((count % 2 === 0) + ' ' + count);

      if (count % 2 === 0 ) {
        setIsPlaying1(true);
        fadeVolume(0, 0.2, 20000, setVolume1);
        fadeVolume(0.2, 0, 20000, setVolume2);
        setTimeout(() => {
          setIsPlaying2(false);
          setSrc2(randomSrc);
          console.log('in 1 Chosen audio file:', randomSrc);
        }, 20000);
      } else {
        setIsPlaying2(true);
        console.log('in 2 Chosen audio file:', randomSrc);
        fadeVolume(0, 0.2, 20000, setVolume2);
        fadeVolume(0.2, 0, 20000, setVolume1);
        setTimeout(() => {
          setIsPlaying1(false);
          setSrc1(randomSrc);
        }, 20000);
      }
    };




    const interval = setInterval(fetchAndToggleAudio, 60 * 1000);
    fetchAndToggleAudio();


    return () => {
      clearInterval(interval);
    };
  }, [category, value]);

  return (
    <>
    <ReactHowler src={src1} playing={isPlaying1} volume={volume1} />
    <ReactHowler src={src2} playing={isPlaying2} volume={volume2} />
    </>
  );
};

export default Player;