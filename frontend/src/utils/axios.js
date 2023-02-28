import axios from 'axios';

const baseURL = 'http://localhost:4000';

const options = {
	headers: { 
		'Access-Control-Allow-Origin' : 'http://localhost:4000',
		'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}
}

export const getData = (url) => {
    return axios.get(baseURL + url)
}

export const putData = (url, data) => {
    return axios.put(
		baseURL + url,
	    data
	)
}

export const postData = (url, data) => {
	console.log('url', baseURL + url);
    return axios.post(
		baseURL + url,
		data, 
		{
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Accept': 'application/json',
				'Origin': "",
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Headers': "content-type",
			}	
		}
	);
}
