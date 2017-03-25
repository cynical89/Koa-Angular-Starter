"use strict";

const config = require("./config.json");

const app = require("./index").app;
const passport = require("./index").passport;
const Router = require("koa-router");
const fs = require("fs");

const routes = new Router();

const main = require("./controllers/main");
const auth = require("./controllers/auth");

function loadHtml() {
	return new Promise(function(resolve, reject) {
		fs.readFile("./dist/index.html", {
			"encoding": "utf8"
		}, function(err, data) {
			if (err) return reject(err);
			resolve(data);
		});
	});
};

if (process.env.NODE_ENV === "production") {
	routes.get(/^\/(.*)(?:\/|$)/, function* (next) {
		if (this.request.url.startsWith("/api")) {
			yield next;
		} else {
			this.body = yield loadHtml();
		}
	});
}

// routes
routes.get("/api/authenticated", main.authenticated);

// login routes
routes.post("/api/login", auth.login);
routes.post("/api/register", auth.register);

app.use(routes.middleware());
