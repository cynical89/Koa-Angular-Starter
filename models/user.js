const db = require("../helpers/db");

module.exports = {
generate: (data) => {
		const returnObj = {
			id: null,
			enabled: false,
			name: "John Doe",
			password: null
		};
		return Object.assign(returnObj, data);
	},
	get: function* get(id) {
		const document = yield db.getDocument(id, `${config.id}_user`);
		return document;
	},
	save: function* save(document) {
		const confirmation = yield db.saveDocument(document, `${config.id}_user`);
		return confirmation;
	}
};
