"use strict";

module.exports.authenticated = function* authenticated() {
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
