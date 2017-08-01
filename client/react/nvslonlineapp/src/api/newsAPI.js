
const WEB_API_URL = "http://localhost/nvslonlineApi/";

var newsAPI = {

	getNews() {
		var url = WEB_API_URL + 'api/news';
		return fetch(url).then((response) => response.json());
	},

	getSinglenNews(Id) {
	 	var url = WEB_API_URL + 'api/news/' + Id;
		return fetch(url).then((response) => response.json());
	},

	addSingleNews(SingleNews) {
		
		var url = WEB_API_URL + 'api/news';
		var request = {
			method: 'POST',
			headers: ({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(SingleNews)
		}
		
		return fetch(url, request).then((response) => response.json());
	},

	updateSingleNews(SingleNews) {
		
		var url = WEB_API_URL + 'api/news/' + SingleNews.id;

		console.log('url', url);
		console.log('object', SingleNews);

		var request = {
			method: 'PUT',
			headers: ({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(SingleNews)
		}
		
		return fetch(url, request).then((response) => response);
	},

	deleteSinglenNews(Id) {

	 	var url = WEB_API_URL + '/api/news/' + Id;

		console.log('url: ', url);

		var request = {
			method: 'DELETE',
			headers: ({ 'Content-Type': 'application/json' })			
		}
		
		return fetch(url, request).then((response) => response.json());
	}

};

module.exports = newsAPI;