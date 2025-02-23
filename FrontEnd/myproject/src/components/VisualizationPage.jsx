import React from 'react';
import { useLocation } from 'react-router-dom';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
import BubbleChart from './BubbleChart';
import PolarAreaChart from './PolarareaChart';
import './VisualizationPage.css';

const VisualizationPage = () => {
    const location = useLocation();
    const { data } = location.state || {}; // Access the passed data.

    return (
        <div className="visualization-page">
            {data && (
                <div className="grid">
                    <div className="card">
                        <BarChart chartData={data.coiData} />
                    </div>
                    <div className="card">
                        <DoughnutChart chartData={data.riData} />
                    </div>
                    <div className="card">
                        <LineChart chartData={data.coipriData} />
                    </div>
                    <div className="card">
                        <BarChart chartData={data.giData} />
                    </div>
                    <div className="card">
                        <BubbleChart chartData={data.rpiData} />
                    </div>
                    <div className="card">
                        <PieChart chartData={data.lppiData} />
                    </div>
                </div>
            )};
        </div>
    );
};

export default VisualizationPage;
