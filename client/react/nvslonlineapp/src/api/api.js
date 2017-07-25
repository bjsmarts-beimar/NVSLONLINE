var api = {

	getNews() {
		var url = 'http://localhost/nvslonlineApi/api/news';
		return fetch(url).then((response) => response.json());
	},

	getSinglenNews(Id) {
	 	var url = 'http://localhost/nvslonlineApi/api/news/' + Id;
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
	},

	updateSingleNews(SingleNews) {
		
		var url = 'http://localhost/nvslonlineApi/api/news/' + SingleNews.id;

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

	 	var url = 'http://localhost/nvslonlineApi/api/news/' + Id;

		console.log('url: ', url);

		var request = {
			method: 'DELETE',
			headers: ({ 'Content-Type': 'application/json' })			
		}
		
		return fetch(url, request).then((response) => response.json());
	}

};

module.exports = api;