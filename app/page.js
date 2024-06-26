'use client'

import { useState, useEffect } from 'react'
import { WiCelsius, WiSandstorm, WiRaindrops, WiDayRainMix, WiCloudyGusts } from 'weather-icons-react'
import Image from 'next/image';
import Player from './components/Player';



const url = "https://api.open-meteo.com/v1/forecast?latitude=42.5695&longitude=47.8645&current=temperature_2m,precipitation,wind_speed_10m"

const Home = () => {
  const [weatherData, setWeatherData] = useState({});
  const [time, setTime] = useState();


  useEffect(() => {
    const interval = setInterval(fetchWeather, 60 * 1000)
    fetchWeather();

    
    return () => {
      clearInterval(interval);
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(currentTime,1000)
    currentTime();
    return () => {
      clearInterval(interval);
    }
  }, [])
  

  const currentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      setTime(timeString);
  }

  const fetchWeather = async() => {
    const response = await fetch(url);
    const data = await response.json();
    const { temperature_2m, precipitation, wind_speed_10m } = data.current;
    console.log({ temperature_2m, precipitation, wind_speed_10m } )
    setWeatherData({ temperature_2m, precipitation, wind_speed_10m });
  }

  return (
    
<div className='flex flex-row'>

  <div className='relative w-5/6 h-screen flex-shrink'>

      <Image
          src='/img/stone1.jpeg' 
          alt='bg'
          fill
          quality={100}
          priority='eager'
          className='-z-20 object-cover'
      />


      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 -z-10'/>

  </div>

      <Player category={'test'} value={weatherData.wind_speed_10m}/>


</div>
  
  )
}

export default Home;
