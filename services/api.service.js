import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import https from 'https'
import axios from "axios";

const _BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};



const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)

    if (!token) {
        throw new Error('token not found')
    }
    // const url = new URL(_BASE_URL)
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'az')
    // url.searchParams.append('units', 'metric')
    //
    // https.get(url, (response) => {
    //     let res = '';
    //
    //     response.on('data', chunk => {
    //         res += chunk
    //     })
    //     response.on('end', () => {
    //         console.log(res)
    //     })
    // })

    const {data}=await axios.get(_BASE_URL,{
        params:{
            q:city,
            appid:token,
            lang:'az',
            units:'metric'
        }
    })
   return data
}

export {getWeather,getIcon}