"use strict";

const passport = require("../index").passport;
const userModel = require("../models/user");

module.exports.login = function* login() {
	const ctx = this;
	yield passport.authenticate("local", function* (err, user, info) {
		if (err) throw err;
		if (user === false) {
			ctx.status = 401;
			ctx.body = {
				success: false
			};
		} else {
			yield ctx.login(user);
			ctx.body = {
				success: true
			};
		}
	});
}

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
	return this.body = result;
};
