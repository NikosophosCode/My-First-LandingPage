const url = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UCF24DcbdgL2w6x2jXZxAFvA&filter=videos_latest&hl=es&gl=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '36508f500amshf40c26e67e26d68p18770djsned61dd7ade51',
		'x-rapidapi-host': 'youtube138.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}