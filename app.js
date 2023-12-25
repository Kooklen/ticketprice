const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 假设您要从特定机场获取航班信息
const airportCode = 'SHA';
const targetDestinationCode = 'BHY';

const startDate = '2023-12-26';
const endDate = '2023-12-27';
const maxPages = 999;  // 设置您想要的最大页面数
const API_ENDPOINT = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}/flights?start=${startDate}&end=${endDate}&max_pages=${maxPages}`;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'x-apikey': 'oAVZ6ZkNgSiY42lRPG5cdtcYXO1qTRKX'
            }
        });
        console.log(response.data);
        const matchingFlights = response.data.scheduled_departures.filter(flight => flight.destination.code_iata === targetDestinationCode);
        console.log(matchingFlights);

        res.send(matchingFlights);
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
