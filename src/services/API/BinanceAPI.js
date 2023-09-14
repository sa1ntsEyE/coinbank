import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BinanceTicker() {
    const [tickerPrice, setTickerPrice] = useState(null);

    useEffect(() => {
        async function fetchTickerPrice() {
            try {
                const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
                const price = response.data.price;

                // Установите цену в состояние компонента
                setTickerPrice(price);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        }

        fetchTickerPrice();
    }, []);

    return (
        <div>
            <h1>Цена тикера Binance:</h1>
            <p>{tickerPrice}</p>
        </div>
    );
}

export default BinanceTicker;
