const config = require("../config.json");
const db = require("../helpers/db");

module.exports = {
	create: function* create() {
		const confirmation = yield db.createDatabase(`${config.id}_information`);
		return confirmation;
	},
	generate: (data) => {
		const returnObj = {
			id: "default",
			enabled: false,
			name: "My Business",
			map: null,
			headline: "",
			cta: "",
			address: "",
			phone: "",
			navbar: []
		};
		return Object.assign(returnObj, data);
	},
	get: function* get(id) {
		const document = yield db.getDocument(id, `${config.id}_information`);
		if (document.error === true) {
			return document;
		}
		return document;
	},
	replace: function* replace(document) {
		const body = yield db.getDocument(document.id, `${config.id}_information`);
		document._id = body._id;
		document._rev = body._rev;
		const confirmation = yield db.saveDocument(document, `${config.id}_information`);
		return confirmation;
	},
	save: function* save(document) {
		const confirmation = yield db.saveDocument(document, `${config.id}_information`);
		return confirmation;
	},
	remove: function* remove(id) {
		const confirmation = yield db.removeDocument(id, `${config.id}_information`);
		return confirmation;
	}
};
