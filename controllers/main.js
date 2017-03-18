"use strict";

const userModel = require("../models/user");

module.exports.auth = function* auth() {
	if (this.isAuthenticated()) {
		this.body = {
			"authenticated": true
		}
	} else {
			this.body = {
				"authenticated": false
			}
	}
	return this.body;
};

module.exports.register = function* register() {
	const params = this.request.body;
	if (!params.username || !params.password) {
		this.stauts = 400;
		return this.body = "Invalid parameters";
	}
	const userCreate = userModel.get(params.username);
	if (Object.keys(userCreate).length > 0 && userCreate.constructor === Object) {
		this.status = 403;
		return this.body = "User already exists.";
	}
	const user = yield userModel.newUser(params);
	const result = yield userModel.save(user);
	if (result.error === true) {
		this.status = 500;
		return this.body = "Internal server error."
	}
	console.log(result)
	return this.body = result;
};
