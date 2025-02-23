import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from 'react-router-dom';
import './SingleSearchSection.css';
import axios from "axios";
import city_data from './JSON_files/list_of_cities.json';

const SingleSearchSection = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState(null); // To store the fetched data
    const [message, setMessage] = useState('');

    //Function to navigate to comparision page.
    const handleAddClick = () => {
        navigate('/compare');
    };

    //City start.
    const [coiData, setCoiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "COI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [riData, setRiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "RI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [coipriData, setCoipriData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "COIPRI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],

            }],
    })

    const [giData, setGiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "GI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [rpiData, setRpiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "RPI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [lppiData, setLppiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "LPPI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
                axis: 'y',
            }],
    })
    //City end.

    //Country start.
    const [countryCoiData, setCountryCoiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "COI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [countryRiData, setCountryRiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "RI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [countryCoipriData, setCountryCoipriData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "COIPRI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],

            }],
    })

    const [countryGiData, setCountryGiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "GI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [countryRpiData, setCountryRpiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "RPI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
            }],
    })

    const [countryLppiData, setCountryLppiData] = useState({
        labels: [2024, 2023, 2022, 2021, 2020],
        datasets: [
            {
                label: "LPPI",
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
                axis: 'y',
            }],
    })
    //Country end.

    // const handleChart = () => {

    // }

    // Function to handle the API request.
    const handleSearchClick = () => {
        const a = Object.values(city_data);
        const b = searchInput;
        const c = b.charAt(0).toUpperCase() + b.substring(1).toLowerCase();

        if (a.includes(c)) {
            axios
                .post('http://localhost:8000/base/post_city/', {
                    city_name: searchInput,
                })
                .then((res) => {
                    setData(res.data); // Set the fetched data

                    // Set chart data
                    const newCoiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: "Cost of Living Index",
                                data: res.data.Index.coi,
                                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
                            },
                        ],
                    };
                    setCoiData(newCoiData);

                    const newRiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Rent Index',
                                data: res.data.Index.ri,
                                backgroundColor: ['#3D5300', '#ABBA7C', '#FFE31A', '#F09319', '#37AFE1'],
                            },
                        ],
                    };
                    setRiData(newRiData);

                    const newCoipriData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                borderColor: '#3a0ca3',
                                label: 'Cost of Living Plus Rent Index',
                                data: res.data.Index.coipri,
                                backgroundColor: ['#04e762', '#f5b700', '#dc0073', '#008bf8', '#89fc00'],
                            },
                        ],
                    };
                    setCoipriData(newCoipriData);

                    const newGiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                indexAxis: 'y',
                                label: 'Groceries Index',
                                data: res.data.Index.gi,
                                backgroundColor: ['#feee00', '#fcd116', '#df00ff', '#9f00ff', '#8f03ff'],
                            },
                        ],
                    };
                    setGiData(newGiData);

                    const newRpiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Restaurant Price Index',
                                data: res.data.Index.rpi,
                                backgroundColor: ['#13d1ff', '#19a5ff', '#fee719', '#fe4f19', '#f00c18'],
                            },
                        ],
                    };
                    setRpiData(newRpiData);

                    const newLppiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Local Purchasing Power Index',
                                data: res.data.Index.lppi,
                                backgroundColor: ['#ffff00', '#aaff00', '#00ff15', '#00ffff', '#0095ff'],
                            },
                        ],
                    };
                    setLppiData(newLppiData);

                    // Navigate to the visualization page with the data
                    navigate('/visualization', {
                        state: {
                            data: {
                                coiData: newCoiData,
                                riData: newRiData,
                                coipriData: newCoipriData,
                                giData: newGiData,
                                rpiData: newRpiData,
                                lppiData: newLppiData,
                            },
                        },
                    });                    
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            axios
                .post('http://localhost:8000/base/post_country/', {
                    country_name: searchInput,
                })
                .then((res) => {
                    setData(res.data); // Set the fetched data

                    // Set chart data (similar to the city response data)
                    const newCountry_CoiData = {
                        labels: res.data.coi_label,
                        datasets: [
                            {
                                label: 'Cost of Living Index',
                                data: res.data.coi,
                                backgroundColor: ['#ffff00', '#aaff00', '#00ff15', '#00ffff', '#0095ff'],
                            },
                        ],
                    };
                    setCoiData(newCountry_CoiData);

                    const newCountry_RiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Rent Index',
                                data: res.data.ri,
                                backgroundColor: ['#13d1ff', '#19a5ff', '#fee719', '#fe4f19', '#f00c18'],
                            }]
                    }
                    setRiData(newCountry_RiData);

                    const newCountry_CoipriData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                borderColor: '#f72585',
                                label: 'Cost of Living Plus Rent Index',
                                data: res.data.coipri,
                                backgroundColor: ['#feee00', '#fcd116', '#df00ff', '#9f00ff', '#8f03ff'],
                            }]
                    }
                    setCoipriData(newCountry_CoipriData);

                    const newCountry_GiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                indexAxis: 'y',
                                label: 'Groceries Index',
                                data: res.data.gi,
                                backgroundColor: ['#04e762', '#f5b700', '#dc0073', '#008bf8', '#89fc00'],
                            }]
                    }
                    setGiData(newCountry_GiData);

                    const newCountry_RpiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Restaurant Price Index',
                                data: res.data.rpi,
                                backgroundColor: ['#3D5300', '#ABBA7C', '#FFE31A', '#F09319', '#37AFE1'],
                            }]
                    }
                    setRpiData(newCountry_RpiData);

                    const newCountry_LppiData = {
                        labels: [2024, 2023, 2022, 2021, 2020],
                        datasets: [
                            {
                                label: 'Local Purchasing Power Index',
                                data: res.data.lppi,
                                backgroundColor: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
                            }]
                    }
                    setLppiData(newCountry_LppiData);

                    // Navigate to the visualization page with the data
                    navigate('/visualization', {
                        state: {
                            data: {
                                coiData: newCountry_CoiData,
                                riData: newCountry_RiData,
                                coipriData: newCountry_CoipriData,
                                giData: newCountry_GiData,
                                rpiData: newCountry_RpiData,
                                lppiData: newCountry_LppiData,
                            },
                        },
                    });   
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        // Update message based on search input
        if (searchInput.trim()) {
            setMessage(`Searching for: ${searchInput}`);
        } else {
            setMessage('Please enter a city or country to search.');
        }
    };
    // console.log(data)

    return (
        <div className="single-search-container">
            <div className="search-section">
                <SearchBar
                    placeholder="Search for a city or country"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onSearch={handleSearchClick}
                />
                <button className="search-button" onClick={handleSearchClick}>
                    Search
                </button>
            </div>
            {message && <div className="search-message">{message}</div>}
            <div className="or-section">
                <h3>
                    OR
                </h3>
                <p>
                    Click the icon to compare cities or countries.
                </p>
                <button onClick={handleAddClick} className="add-button">
                    +
                </button>
            </div>
        </div>
    );
};

export default SingleSearchSection;
