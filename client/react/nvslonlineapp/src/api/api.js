var api = {

	getNews() {
		var url = 'http://localhost/nvslonlineApi/api/news';
		return fetch(url).then((response) => response.json());
	},

	addSingleNews(SingleNews) {
		
		var url = 'http://localhost/nvslonlineApi/api/news';
		var request = {
			method: 'POST',
			headers: ({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(SingleNews)
		}
		
		return fetch(url, request).then((response) => response.json());
	}

};

module.exports = api;