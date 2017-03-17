"use strict";

const config = require("./config.json");

const koa = require("koa");
const cors = require("kcors");
const serve = require("koa-static");

// for passport support
const session = require("koa-generic-session");
const redis = require("koa-redis");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");

const app = koa();
app.use(cors());

exports.app = app;
exports.passport = passport;

// the auth model for passport support
require("./models/auth");

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];
if (process.env.NODE_ENV === "production") {
app.use(session({
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    store : redis()
}));
} else {
  app.use(session());
}

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// statically serve assets
if (process.env.NODE_ENV === "production") {
    app.use(serve("./dist"));
}

app.use(function* error(next) {
    try {
		yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit("error", err, this);
    }
});

require("./routes");

console.log(`Koa-Angular-Starter is now listening on port ${config.site.port}`);
app.listen(config.site.port);

process.on("SIGINT", function exit() {
    process.exit();
});
