import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, InputGroup, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import sun_icon from '../images/sun.png'
import moon_icon from '../images/moon.png'
import overcast_icon from '../images/overcast clouds.png'
import rain_icon from '../images/rainy_day.png'
import snow_icon from '../images/snow.png'
import mist_icon from '../images/mist.png'

const WeatherApp = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        wind: "",
        temperature: "",
        location: ""
    });
    const [searchInput, setSearchInput] = useState('');
    const [weatherIcon, setWeatherIcon] = useState(sun_icon);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        fetchWeather(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };
        getLocation();
    }, []);

    let api_key = "b8718d34e2dac23f74027e5d7cf0d614";

    const fetchWeather = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            let data = await response.json();
            console.log(data.weather[0].icon)
            console.log(data)

            if (!data.main || !data.wind || !data.name) {
                throw new Error('Invalid weather data structure');
            }
            setWeatherData({
                humidity: data.main.humidity,
                wind: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon : data.weather[0].icon                
            });
            if(data.weather[0].icon === "01d" || data.weather[0].icon === "02d" || data.weather[0].icon === "03d"){
                setWeatherIcon(sun_icon)
            }else if(data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n"){
                setWeatherIcon(moon_icon)            
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                setWeatherIcon(overcast_icon)            
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
                setWeatherIcon(rain_icon)            
            }
            else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
                setWeatherIcon(rain_icon)            
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                setWeatherIcon(snow_icon)            
            }
            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                setWeatherIcon(mist_icon)            
            }
            else{
                setWeatherIcon(sun_icon)
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const search = async () => {
        if (!searchInput.trim()) {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            let data = await response.json();
            console.log(data.weather[0].icon)
            console.log(data)

            if (!data.main || !data.wind || !data.name) {
                throw new Error('Invalid weather data structure');
            }
            setWeatherData({
                humidity: data.main.humidity,
                wind: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon : data.weather[0].icon 
            });
            if(data.weather[0].icon === "01d" || data.weather[0].icon === "02d" || data.weather[0].icon === "03d"){
                setWeatherIcon(sun_icon)
            }else if(data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n"){
                setWeatherIcon(moon_icon)            
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                setWeatherIcon(overcast_icon)            
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
                setWeatherIcon(rain_icon)            
            }
            else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
                setWeatherIcon(rain_icon)            
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                setWeatherIcon(snow_icon)            
            }
            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                setWeatherIcon(mist_icon)            
            }
            else{
                setWeatherIcon(sun_icon)
            }
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="search"
                            type='text'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button variant="outline-secondary" onClick={search}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='weather-image'>                        
                        {/* <FontAwesomeIcon icon={weatherIcon} flip="horizontal" size="2xl" style={{ color: "#74C0FC" }} /> */}
                        <Image src={weatherIcon} alt=''/>
                    </div>
                </Col>
            </Row>
             
            <div className='weather-temp' id='weather-temp'>
                {weatherData.temperature}&deg;C
            </div>
            <div className='weather-location' id='weather-location'>
                {weatherData.location}
            </div>
            <div className='weather-update'>
                <div className='weather-humidity'>
                    <FontAwesomeIcon icon={faWater} />
                    <div className='humidity-data'>
                        <div className='humidity-percentage' id='humidity-percent'>{weatherData.humidity}%</div>
                        <div className='humidity-text'>Humidity</div>
                    </div>
                </div>
                <div className='weather-wind'>
                    <FontAwesomeIcon icon={faWind} />
                    <div className='wind-data'>
                        <div className='wind-rate' id='wind-rate'>{weatherData.wind} km/h</div>
                        <div className='wind-text'>Wind speed</div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default WeatherApp;
