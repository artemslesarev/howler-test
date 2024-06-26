import { useState,useEffect, useCallback } from 'react';
import ReactHowler from 'react-howler';



const Player = ({category, value = 0, activeComponent}) => {

  console.log(`received in ${category} ` + value);
  

  const paths = {

    wind: {
  
    softWind: [
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20lightly%20low%20grass.mp3'
        ,
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20lightly%20low%20.mp3'
        ,
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20low%20soft%20birds%20midddday.mp3'
    ],
  
    strongWind: [
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20%20trees%20wispy%20breeze.mp3'
        ,
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20forest.mp3'
        ,
        'https://radiosygma.ams3.cdn.digitaloceanspaces.com/tema-s/wind%20%20strong%20gentle%20breeze.mp3'
     
    ],
    }
  
  }

  // const [subcategory, setSubcategory] = useState();
  const [src1, setSrc1] = useState(paths);
  const [src2, setSrc2] = useState(paths);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(0);
  const [nextSrc, setNextSrc] = useState();
  const [subcategory, setSubcategory] = useState();

  const [volume1, setVolume1] = useState(0);
  const [volume2, setVolume2] = useState(0);
 

  const getRandomAudioPath = async (cat, subcat) => {
    const sources = await paths[cat][subcat];
    const randomIndex = Math.floor(Math.random() * sources.length);
    return sources[randomIndex];
  };

// CATEGORY
useEffect(()=> {
  if (category === 'wind') {
    setSubcategory(value > 10 ? 'strongWind' : 'softWind');
    getRandomAudioPath(category, subcategory).then(result => {
      setSrc1(result);
    });
  }
}, [category, subcategory, value]);



useEffect(() => {
  const logSrc1 = async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // wait for state update to complete
    console.log(src1);
  };
  logSrc1();
}, [src1]);


    // if (activeComponent === 1) {
    //   setSrc1(src1);
    //   setIsPlaying1(true);
    //   fadeVolume(0, 1, 20000, setVolume1);
    //   fadeVolume(1, 0, 20000, setVolume2);
    //   setTimeout(() => {
    //     setIsPlaying2(false);
    //   }, 20000);
    // } else {
    //   setSrc2(src2);
    //   setIsPlaying2(true);
    //   fadeVolume(0, 1, 20000, setVolume2);
    //   fadeVolume(1, 0, 20000, setVolume1);
    //   setTimeout(() => {
    //     setIsPlaying1(false);
    //   }, 20000);
    // }
  // }, [value]);

  



const handlePlay1 = () => {
    setIsPlaying1(true);
  }
// const fadeVolume = (startVolume, endVolume, duration, setVolumeCallback) => {
//   const stepTime = 50; // in milliseconds
//   const steps = duration / stepTime;
//   const volumeStep = (endVolume - startVolume) / steps;
//   let currentStep = 0;

//   const fadeInterval = setInterval(() => {
//     if (currentStep <= steps) {
//       setVolumeCallback((prevVolume) => prevVolume + volumeStep);
//       currentStep += 1;
//     } else {
//       clearInterval(fadeInterval);
//     }
//   }, stepTime);
// };




  return (
  <>

      <ReactHowler 
        src={src1}
        playing={isPlaying1}
        volume={0.2}
        loop={true}
        preload={false}
        loaded={isLoaded1}
        onLoad={() => {
          console.log('loaded')
        }}
        onLoadError={(id, error) => console.error('Load error:', id, error)}
        onPlayError={(id, error) => console.error('Play error:', id, error)}
      />
      {/* <ReactHowler 
        src={src1}
        playing={isPlaying2}
        volume={0.2}
        loop={true}
        preload={false}
        loaded={isLoaded1}
        onLoad={() => {
          console.log('loaded')
        }}
        onLoadError={(id, error) => console.error('Load error:', id, error)}
        onPlayError={(id, error) => console.error('Play error:', id, error)}
      /> */}

  <div className='absolute top-0 left-0'>
      <div className=''>
          <button onClick={handlePlay1}>play</button>
      </div>
  </div>
     
  </>
  )
}

export default Player;