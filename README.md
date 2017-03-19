# Koa-Angular-Starter
Koa and Angular2 starter using passport authentication!

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 6 and up recommended)
* [CouchDB](http://couchdb.apache.org/)
* [Redis](http://redis.io/) (Only in production mode - for sessions);

### Installation

* Clone down the repository.
```
git clone https://github.com/thestdio/Koa-Angular-Starter.git
```

* Install packages (from inside the Koa-Angular-Starter folder).
```
npm install
```

* Create your config.  There's a `config.json.example` file in the root.  Edit it to include all your values for the site.  Save it as `config.json` and leave it in the root.

* Start up CouchDB

* Create a database (st-users)
```
http://127.0.0.1:5984/_utils/
```

* Start it up.
```
npm start
```

* Enjoy!
