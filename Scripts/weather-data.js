import { Revise } from 'revise-sdk';
import fetch from "node-fetch";
import fs from "fs";


// API Keys

/* agro monitoring 
 	polygon id - 635cf25a176fe6831443f2df
	 api id - b58f66ea030f42fad0c0d3c651b4fbe5
	get list of polygons - http://api.agromonitoring.com/agro/1.0/polygons?appid=b58f66ea030f42fad0c0d3c651b4fbe5
	soil data api -   http://api.agromonitoring.com/agro/1.0/soil?polyid=635cf25a176fe6831443f2df&appid=b58f66ea030f42fad0c0d3c651b4fbe5
*/

/* open weather
	https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7213a477744939cbb8d1efba2c603cc1
	https://maps.openweathermap.org/maps/2.0/radar/6/13/24?&appid=7213a477744939cbb8d1efba2c603cc1&tm=1600781400
*/

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjM2ZhMzg0LTJmMzYtNDhlNC1hYjI3LTI2MmIwZjJlNWZhMyIsImtleSI6IjB4OXExMG00IiwiaWF0IjoxNjY0MTQzNDQzfQ.sZAITgYVoi-27sayi6gTR5W4PGgHNybyvjNEW1CfXck"; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise({auth: AUTH_TOKEN});


const API = async function() {
	const url = "http://api.agromonitoring.com/agro/1.0/soil?polyid=635cf25a176fe6831443f2df&appid=b58f66ea030f42fad0c0d3c651b4fbe5"
	const data = await fetch(url).then(response => response.json())
	const soil_data = { 'date' : data['dt'], 'soil-moisture' : data['moisture'], 'soil-temp' : data['t0']}
	// convert unix date to time stamp
	var recorded_date = new Date(soil_data['date']*1000)
	// convert kelvin to celsius
	var soil_temp = Math.round(soil_data['soil-temp'] - 273.15)
	var soil_moisture = Math.round(soil_data['soil-moisture'] * 100)

	var api_data = {
		'recorded_date' : recorded_date,
		'soil_temp' : soil_temp,
		'soil_moisture' : soil_moisture
	}
	var today = new Date();
	var filename = 'soil-data-' + today+".json";
	const daily_soil_data = JSON.stringify(api_data)
	fs.writeFileSync(filename, daily_soil_data);
}

async function run() {
    revise.every('20s').listenTo(API).start(async (data) => {
    console.log("Daily data")
  })
}
run()