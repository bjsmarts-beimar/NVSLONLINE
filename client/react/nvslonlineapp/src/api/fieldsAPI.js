const WEB_API_URL = "http://localhost/nvslonlineApi/";

var fieldsAPI = {

    getFields() {
		var url = WEB_API_URL + 'api/Venues';
		return fetch(url).then((response) => response.json());
	},

	getSingleField(Id) {
	 	var url = WEB_API_URL + 'api/Venues/' + Id;
		return fetch(url).then((response) => response.json());
	},

	addSingleField(newField) {
		
		var url = WEB_API_URL + 'api/Venues';
		var request = {
			method: 'POST',
			headers: ({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(newField)
		}
		
		return fetch(url, request).then((response) => response.json());
	},

	updateSingleField(singleField) {
		
		var url = WEB_API_URL + 'api/Venues/' + singleField.id;
		
		var request = {
			method: 'PUT',
			headers: ({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(singleField)
		}
		
		return fetch(url, request).then((response) => response);
	},

	deleteSingleField(Id) {

	 	var url = WEB_API_URL + '/api/Venues/' + Id;
		
		var request = {
			method: 'DELETE',
			headers: ({ 'Content-Type': 'application/json' })			
		}
		
		return fetch(url, request).then((response) => response.json());
	}

};

module.exports = fieldsAPI;