import chalk from 'chalk'
import dedent from "dedent";

const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')} ${error}`)
}
const printSuccess = (message) => {
    console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`)
}

const printHelp = () => {
    console.log(dedent`
      ${chalk.bgCyan('HELP ')}
      without argument: output weather of the current city
      -s [CITY]: save city to config file 
      -t [API_KEY]: save api key to config file
      -h: output help
    `)
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER ')} Forecast of city ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}
		`
    );
};

export {printError, printSuccess,printHelp,printWeather}