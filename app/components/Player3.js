import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';

const Player = ({ category, value }) => {
  const paths = {
    wind: {
      softWind: [
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20lightly%20low%20grass.mp3',
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20lightly%20low%20.mp3',
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20low%20soft%20birds%20midddday.mp3'
      ],

      strongWind: [
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20%20trees%20wispy%20breeze.mp3',
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20forest.mp3',
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20gentle%20breeze.mp3'
      ],
    },

    rain: {
      drizzle: [
        '/aud/Nature basic/Forest rain /forest rain  leaves drops.mp3',
        '/aud/Nature basic/Forest rain /forest rain maple leaves .mp3',
        '/aud/Nature basic/Forest rain /forest rain stream leaves drops.mp3'
      ],

      showers: [
        '/aud/Nature basic/Waterfalls/noisy small waterfall.mp3',
        '/aud/Nature basic/Waterfalls/waterfall medium distant.mp3',
        '/aud/Nature basic/Waterfalls/waterfall small but close.mp3'
      ]
    },

    special: {
      ceramics: [
        '/aud/Specials/Ceramic/Rubbing on Ceramics _1.mp3',
        '/aud/Specials/Ceramic/Rubbing on Ceramics _2.mp3',
        '/aud/Specials/Ceramic/ASMR Rubbing on Ceramics & Pottery (NO TALKING).mp3'

      ],

      fire: [

      ]
    }

    

  };

  const [src1, setSrc1] = useState(null);
  const [src2, setSrc2] = useState(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [volume1, setVolume1] = useState(0.2);
  const [volume2, setVolume2] = useState(0);

  useEffect(() => {
    const fetchAndToggleAudio = async () => {
      const subCat = value > 10 ? 'ceramics' : 'fire';
      const randomSrc = paths[category][subCat][Math.floor(Math.random() * paths[category][subCat].length)];

      console.log('Chosen audio file:', randomSrc);

      if (isPlaying1) {
        setIsPlaying2(true);
        setSrc2(randomSrc);
        // fadeVolume(volume1, 0, 20000, setVolume1);
        setTimeout(() => {
          setIsPlaying1(false);
        }, 20000);
      } else {
        setIsPlaying1(true);
        setSrc1(randomSrc);
        fadeVolume(volume2, 1, 20000, setVolume2);
        setTimeout(() => {
          // setIsPlaying2(false);
        }, 20000);
      }
    };

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

    const interval = setInterval(fetchAndToggleAudio, 60 * 1000);
    fetchAndToggleAudio();

    return () => {
      clearInterval(interval);
    };
  }, [category, value]);

  return (
    <>
      {isPlaying1 && <ReactHowler src={src1} playing={isPlaying1} volume={volume1} />}
      {isPlaying2 && <ReactHowler src={src2} playing={isPlaying2} volume={volume2} />}
    </>
  );
};

export default Player;