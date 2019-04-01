![Image](./public/favicon.ico)
# JsonApiTestServer
[![Build Status](https://travis-ci.org/tigi44/JsonApiTestServer.svg?branch=master)](https://travis-ci.org/tigi44/JsonApiTestServer)

## FEATURE
- [NodeJS](https://nodejs.org)
- [express](https://www.npmjs.com/package/express) module
- [JSON Editor](https://github.com/josdejong/jsoneditor)

## NodeJS
- install NodeJS : Latest Current Version version
- this project using v9.8.0
- [NodeJS Download](https://nodejs.org/en/download/current/)
- [npm registry](https://www.npmjs.com)

## GET
```
git clone https://github.com/tigi44/JsonApiTestServer.git
```

## INSTALL
```
$ npm install
```

## START
- default port :3000
```
$ npm start
```
- set port :8080
```
$ PORT=8080 npm start
```
- debug mode
```
$ DEBUG=jsonapitestserver:* npm start
```
- node env
```
$ NODE_ENV=development npm start
$ NODE_ENV=production npm start
```

## RESTful API
- GET : Read (Content-Type -> application/json)
- DELETE : Delete (Content-Type -> application/json)
- POST : Create , Read (Content-Type -> application/json, BODY - raw data)
- PUT : Update, Create (Content-Type -> application/json, BODY - raw data)
![Image](./public/readmeImage/example_post_body.png)
- if you add postfix '.json' to api url, the 'Content-Type' will be changed to 'application/json'

## #set env....
```
$ export NODE_ENV=development
$ export NODE_ENV=production
```
```
$ export DEBUG=jsonapitestserver:*
```

## #package
### nodemon
- auto restart nodejs package
- https://www.npmjs.com/package/nodemon
