import React from "react"
import { PolarArea } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

const PolarAreaChart = ({ chartData }) => {
    return <PolarArea data={chartData} />
}

export default PolarAreaChart;