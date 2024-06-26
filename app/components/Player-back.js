import { useState, useEffect, useCallback } from 'react';
import ReactHowler from 'react-howler';

const Player = ({ category, value = 0, activeComponent }) => {
  console.log(`received in ${category} ` + value);

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
      ]
    }
  };

  const [src1, setSrc1] = useState(paths);
  const [src2, setSrc2] = useState(paths);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [volume1, setVolume1] = useState(0);
  const [volume2, setVolume2] = useState(0);
  const [subcategory, setSubcategory] = useState('');

  const getRandomAudioPath = async (cat, subcat) => {
    const sources = paths[cat][subcat];
    const randomIndex = Math.floor(Math.random() * sources.length);
    return sources[randomIndex];
  };

  const fadeVolume = (startVolume, endVolume, duration, setVolumeCallback) => {
    const stepTime = 50; // in milliseconds
    const steps = duration / stepTime;
    const volumeStep = (endVolume - startVolume) / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      if (currentStep <= steps) {
        setVolumeCallback((prevVolume) => prevVolume + volumeStep);
        currentStep += 1;
      } else {
        clearInterval(fadeInterval);
      }
    }, stepTime);
  };

  // Handle category and subcategory
  useEffect(() => {
    if (category === 'wind') {
      setSubcategory(value > 10 ? 'strongWind' : 'softWind');
    }
  }, [category, value]);

  // Handle playing logic
  useEffect(() => {
    const handleToggle = async () => {
      if (isPlaying1) {
        setIsPlaying2(true);
        const newSrc = await getRandomAudioPath(category, subcategory);
        setSrc2(newSrc);
        fadeVolume(0, 1, 20000, setVolume2);
        fadeVolume(1, 0, 20000, setVolume1);
        setTimeout(() => {
          setIsPlaying1(false);
        }, 20000);
      } else {
        setIsPlaying1(true);
        const newSrc = await getRandomAudioPath(category, subcategory);
        setSrc1(newSrc);
        fadeVolume(0, 1, 20000, setVolume1);
        fadeVolume(1, 0, 20000, setVolume2);
        setTimeout(() => {
          setIsPlaying2(false);
        }, 20000);
      }
    };

    if (subcategory) {
      handleToggle();
    }
  }, [subcategory, category]);

  return (
    <>
      <ReactHowler
        src={src1}
        playing={isPlaying1}
        volume={volume1}
        loop={true}
        preload={false}
        onLoad={() => console.log('Player 1 loaded')}
        onLoadError={(id, error) => console.error('Player 1 load error:', id, error)}
        onPlayError={(id, error) => console.error('Player 1 play error:', id, error)}
      />
      <ReactHowler
        src={src2}
        playing={isPlaying2}
        volume={volume2}
        loop={true}
        preload={false}
        onLoad={() => console.log('Player 2 loaded')}
        onLoadError={(id, error) => console.error('Player 2 load error:', id, error)}
        onPlayError={(id, error) => console.error('Player 2 play error:', id, error)}
      />

      <div className='absolute top-0 left-0'>
        <div>
          <button onClick={() => setIsPlaying1(!isPlaying1)}>Toggle Play</button>
        </div>
      </div>
    </>
  );
};

export default Player;
