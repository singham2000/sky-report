import { useEffect, useState, useRef } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [tdata, setTdata] = useState([]);
  const [wdata, setWdata] = useState([]);
  const [winds, setWinds] = useState([]);
  const [cloud, setCloud] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [locdata, setLocdata] = useState([]);
  const fetchdata = useRef(true);
  // "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=e646769d04d082ce20e4469c63f69074";

  useEffect(() => {
    const geo = async () => {
      if (fetchdata.current) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            Axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=e646769d04d082ce20e4469c63f69074").then((res) => {
              setLocdata(res.data);
              setWinds(res.data.wind);
              setCloud(res.data.clouds);
              console.log(res.data);
              setTdata(res.data.main);
              setWdata(res.data.weather[0]);
            })
          })
        }
      }
    }
    geo();
    return () => (fetchdata.current = false);
  }, []);

  return (
    <div className="App">
      <div className='tab'>
        <div className='citynametab'>{locdata.name} </div>
        <div className='optionstab'>{tdata.temp}℃</div>
      </div>
      <div className='center'>
        {tdata.feels_like}℃
        <h1 className='description'>{wdata.description}</h1>
        <h3 className='description'>{tdata.temp_min}℃~{tdata.temp_max}℃</h3>
      </div>
      <div className='bottom'>
        <div className='bottomtab'>
          <div className='inputs'>
            <i className="fa-solid fa-temperature-half"></i>
            {tdata.temp}℃
          </div>
          <div className='inputs'>
            <i className="fa-solid fa-fan"></i>
            {winds.speed}m/s
          </div>
          <div className='inputs'>
            <i className="fa-solid fa-droplet"></i>
            {tdata.humidity}%
          </div>
        </div>
        <div className='bottomtab'>
          <div className='inputs'>
            <i className="fa-solid fa-cloud"></i>
            {cloud.all}%
          </div>
          <div className='inputs'>
            <i className="fa-solid fa-eye"></i>
            {locdata.visibility}m
          </div>
          <div className='inputs'>
            <i className="fa-solid fa-gauge"></i>
            {tdata.pressure}hPa
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
