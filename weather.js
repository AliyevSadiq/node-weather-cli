#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess,printWeather} from "./services/log.service.js";
import {TOKEN_DICTIONARY, saveKeyValue, getKeyValue} from "./services/storage.service.js";
import {getWeather,getIcon} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError("token is required")
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    try {
        if (!city.length) {
            printError("city is required")
            return
        }
        await saveKeyValue(TOKEN_DICTIONARY.city,city)
        printSuccess("city saved")
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {

    try {
        const weather = await getWeather(await getKeyValue('city'));
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError("city is invalid")
        } else if (e?.response?.status === 401) {
            printError("token is invalid")
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        printHelp()
    } else if (args.t) {
        saveToken(args.t)
    } else if (args.s) {
        saveCity(args.s)
    } else {
        getForecast();
    }
}

initCLI()