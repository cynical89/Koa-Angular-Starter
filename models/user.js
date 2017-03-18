const db = require("../helpers/db");
const bcrypt = require("bcryptjs");

module.exports = {
	newUser: function* newUser(data) {
		const salt = yield bcrypt.genSalt(10);
		const hash = yield bcrypt.hash(data.password, salt);
		const user = {
			id: data.username,
			name: data.name,
			password: hash,
			email: data.email
		};
		return user;
	},
	get: function* get(id) {
		const document = yield db.getDocument(id, `st-users`);
		return document;
	},
	save: function* save(document) {
		const confirmation = yield db.saveDocument(document, `st-users`);
		return confirmation;
	}
};
