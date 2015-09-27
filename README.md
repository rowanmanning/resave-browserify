
Resave Browserify
=================

A middleware for compiling and saving [Browserify][browserify] bundles. Use with [Connect][connect] or [Express][express] and [static middleware][serve-static]. Built with [Resave][resave].

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![Code coverage][shield-coverage]][info-coverage]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]

```js
var connect = require('connect');
var resaveBrowserify = require('resave-browserify');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic('./public'));
app.use(resaveBrowserify({
    bundles: {
        '/main.js': './source/main-bundle.js'
    },
    savePath: './public'
}));

app.listen(3000);
```


Table Of Contents
-----------------

- [Install](#install)
- [Getting Started](#getting-started)
- [Options](#options)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)


Install
-------

Install Resave Browserify with [npm][npm]:

```sh
npm install resave-browserify
```


Getting Started
---------------

Require in Resave Browserify:

```js
var resaveBrowserify = require('resave-browserify');
```

Use the created middleware in your application:

```js
var connect = require('connect');

var app = connect();

app.use(resaveBrowserify({
    bundles: {
        '/main.js': './source/main-bundle.js'
    }
}));
```

In the example above, requests to `/main.js` will load the file `./source/main-bundle.js`, run it through Browserify, and serve it up.

This isn't great in production environments as it can be quite slow. In these cases you can save the output to a file which will get served by another middleware:

```js
var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic('./public'));

app.use(resaveBrowserify({
    bundles: {
        '/main.js': './source/main-bundle.js'
    },
    savePath: './public'
}));
```

In the example above the first time `/main.js` is requested it will get browserified and saved into `public/main.js`. On the next request, the `serve-static` middleware will find the created file and serve it up with proper caching etc.


Options
-------

#### `basePath` (string)

The directory to look for bundle files in. Defaults to `process.cwd()`.

#### `browserify` (object)

A configuration object which will get passed into Browserify. See the [Browserify options documentation][browserify-opts] for more information.

If `NODE_ENV` is `'production'`, it defaults to:

```js
{
    debug: false
}
```

If `NODE_ENV` is *not* `'production'`, it defaults to:

```js
{
    debug: true
}
```

#### `bundles` (object)

A map of bundle URLs and source paths. The source paths are relative to the `basePath` option. In the following example requests to `/foo.js` will load, compile and serve `source/foo-bundle.js`:

```js
app.use(resaveBrowserify({
    basePath: 'source'
    bundles: {
        '/foo.js': 'foo-bundle.js'
    }
}));
```

#### `log` (object)

An object which implments the methods `error` and `info` which will be used to report errors and information.

```js
app.use(resaveBrowserify({
    log: console
}));
```

#### `savePath` (string)

The directory to save bundled files to. This is optional, but is recommended in production environments. This should point to a directory which is also served by your application. Defaults to `null`.

Example of saving bundles only in production:

```js
app.use(resaveBrowserify({
    savePath: (process.env.NODE_ENV === 'production' ? './public' : null)
}));
```


Examples
--------

### Basic Example

Bundle some JavaScript files together with Browserify and serve them up.

```
node example/basic
```


Contributing
------------

To contribute to Resave Browserify, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
make lint test
```


License
-------

Resave Browserify is licensed under the [MIT][info-license] license.  
Copyright &copy; 2015, Rowan Manning



[browserify]: https://github.com/substack/node-browserify
[browserify-opts]: https://github.com/substack/node-browserify#methods
[connect]: https://github.com/senchalabs/connect
[express]: http://expressjs.com/
[npm]: https://npmjs.org/
[resave]: https://github.com/rowanmanning/resave
[serve-static]: https://github.com/expressjs/serve-static

[info-coverage]: https://coveralls.io/github/rowanmanning/resave-browserify
[info-dependencies]: https://gemnasium.com/rowanmanning/resave-browserify
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/resave-browserify
[info-build]: https://travis-ci.org/rowanmanning/resave-browserify
[shield-coverage]: https://img.shields.io/coveralls/rowanmanning/resave-browserify.svg
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/resave-browserify.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–4-brightgreen.svg
[shield-npm]: https://img.shields.io/npm/v/resave-browserify.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/resave-browserify/master.svg
