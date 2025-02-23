import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from "axios";
import city_data from './JSON_files/list_of_cities.json';
import './CompareSearchSection.css';

const CompareSearchSection = () => {
    const [currentCity, setCurrentCity] = useState('');
    const [compareCity, setCompareCity] = useState('');
    const [message, setMessage] = useState('');
    const [coiData, setCoiData] = useState([]);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    const navigate = useNavigate();

    const handleCompare = () => {
        const cities = [currentCity, compareCity];
        const formattedCities = cities.map(city => city.charAt(0).toUpperCase() + city.substring(1).toLowerCase());

        if (formattedCities.every(city => Object.values(city_data).includes(city))) {
            // Handle search for both cities
            axios
                .post('http://localhost:8000/base/compare_two_cities/', {
                    city1_name: currentCity,
                    city2_name: compareCity,
                })
                .then((res) => {
                    setData1(res.data.city1); // Set data for city 1
                    setData2(res.data.city2); // Set data for city 2

                    // Set chart data for city 1
                    const newCity1_CoiData = {
                        labels: [currentCity, compareCity], // City names instead of years
                        datasets: [{
                            label: "Cost of Living Index",
                            data: res.data.city1.coi, // The cost of living index data for city 1
                            backgroundColor: ['#f72585', '#7209b7'],
                        }],
                    };

                    // Set chart data for city 2
                    const newCity2_CoiData = {
                        labels: [currentCity, compareCity], // City names instead of years
                        datasets: [{
                            label: "Cost of Living Index",
                            data: res.data.city2.coi, // The cost of living index data for city 2
                            backgroundColor: ['#00ff00', '#ff9800'],
                        }],
                    };

                    // Navigate to the comparison page with the chart data
                    navigate('/visualization', {
                        state: {
                            data: {
                                city1Data: newCity1_CoiData, // Add all charts for city 1
                                city2Data: newCity2_CoiData, // Add all charts for city 2
                            },
                        },
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            // Handle search for countries if city names are not found
            axios
                .post('http://localhost:8000/base/compare_two_cities/', {
                    country1_name: currentCity,
                    country2_name: compareCity,
                })
                .then((res) => {
                    setData1(res.data.country1); // Set data for country 1
                    setData2(res.data.country2); // Set data for country 2

                    // Set chart data for country 1
                    const newCountry1_CoiData = {
                        labels: [currentCity, compareCity], // City names for countries as well
                        datasets: [{
                            label: "Cost of Living Index",
                            data: res.data.country1.coi, // The cost of living index data for country 1
                            backgroundColor: ['#f72585', '#7209b7'],
                        }],
                    };

                    // Set chart data for country 2
                    const newCountry2_CoiData = {
                        labels: [currentCity, compareCity], // City names for countries as well
                        datasets: [{
                            label: "Cost of Living Index",
                            data: res.data.country2.coi, // The cost of living index data for country 2
                            backgroundColor: ['#00ff00', '#ff9800'],
                        }],
                    };

                    // Navigate to the comparison page with the chart data
                    navigate('/visualization', {
                        state: {
                            data: {
                                country1Data: newCountry1_CoiData, // Add all charts for country 1
                                country2Data: newCountry2_CoiData, // Add all charts for country 2
                            },
                        },
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        // Update message based on comparison inputs
        if (currentCity.trim() && compareCity.trim()) {
            setMessage(`Comparing: ${currentCity} and ${compareCity}`);
        } else {
            setMessage('Please enter both cities or countries to compare.');
        }
    };

    const handleSwap = () => {
        const temp = currentCity;
        setCurrentCity(compareCity);
        setCompareCity(temp);
    };

    return (
        <div className="compare-search-container">
            <div className="city-inputs">
                <div className="input-section">
                    <label>
                        Current City
                    </label>
                    <SearchBar
                        placeholder="Ex: Bengaluru"
                        value={currentCity}
                        onChange={(e) => setCurrentCity(e.target.value)}
                    />
                </div>
                <div className="swap-button" onClick={handleSwap}>
                    <div className="arrow-left">
                        &larr;
                    </div>
                    <div className="arrow-right">
                        &rarr;
                    </div>
                </div>
                <div className="input-section">
                    <label>
                        Comparative City
                    </label>
                    <SearchBar
                        placeholder="Ex: Mumbai"
                        value={compareCity}
                        onChange={(e) => setCompareCity(e.target.value)}
                    />
                </div>
            </div>
            <button className="compare-button" onClick={handleCompare}>
                Compare
            </button>
            {message && <div className="compare-message">{message}</div>}
        </div>
    );
};

export default CompareSearchSection;
