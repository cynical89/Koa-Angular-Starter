"use strict";

// const common = require("../helpers/common");

const informationModel = require("../models/information");

module.exports.login = function* login() {
	const information = yield informationModel.get("default");
	// yield this.render("login", {
	this.body = {
		title: `${information.name} - Login`,
		information: information
	};
	// });
};
