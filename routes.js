"use strict";

const config = require("./config.json");

const app = require("./index").app;
const passport = require("./index").passport;
const Router = require("koa-router");
const fs = require("fs");

const routes = new Router();

const main = require("./controllers/main");

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
routes.get("/", () => {
    ctx = this;
    return ctx.body = {"madeit": "ok"};
})

routes.get("/api/authenticated", main.auth);

// login routes
routes.get("/api/login", main.login);
routes.post("/api/login", function* (next) {
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
	}).call(this, next);
});

app.use(routes.middleware());
