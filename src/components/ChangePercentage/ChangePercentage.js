import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import arrow from "../../assets/arrow.png"
import arrow2 from "../../assets/arrow2.png"
import './ChangePercentage.css';
Chart.register(...registerables);

const ChangePercentage = ({ symbol }) => {
    const [priceData, setPriceData] = useState([]);
    const [priceChange, setPriceChange] = useState(null);

    const fetchPriceData = async () => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const prices = data.map(item => parseFloat(item[4]));
            const updatedPrices = prices.map(price => price * 0.9);

            // Вычислите процентное изменение
            const initialPrice = updatedPrices[0];
            const currentPrice = updatedPrices[updatedPrices.length - 1];
            const changePercentage = ((currentPrice - initialPrice) / initialPrice) * 100;
            setPriceChange(changePercentage.toFixed(2));

            setPriceData(updatedPrices);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPriceData();
    }, [symbol]);


    const chartData = {
        labels: Array.from({ length: priceData.length }, (_, i) => i),
        datasets: [
            {
                label: ``,
                data: priceData,
                borderColor: 'rgba(0, 128, 0, 0.6)',
                fill: true,
                tension: 0.1,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                display: false,
            },
            y: {
                beginAtZero: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };


    return (
        <div className={`price--coin--change--subtitle ${priceChange < 0 ? 'red-bg' : 'green-bg'}`} style={{ maxWidth: '228px', maxHeight: '70px' }}>
            {priceChange !== null && (
                <div className="change">
                    {priceChange > 0 ? (
                        <>
                            <img src={arrow} alt="" />
                            {priceChange}%
                        </>
                    ) : (
                        <>
                            <img src={arrow2} alt="" />
                            {priceChange}%
                        </>
                    )}
                </div>
            )}
        </div>
    );

};

export default ChangePercentage;