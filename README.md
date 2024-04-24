# Node Module System 

##  Global Object

```js
console.log(global);
```

```js
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [Getter/Setter],
  navigator: [Getter],
  crypto: [Getter]
}
```



## Modules

![image-20240424134556070](./README.assets/image-20240424134556070.png)

![image-20240424134644342](./README.assets/image-20240424134644342.png)

> app.js: main module

```js
console.log(module);
```

```js
{
  id: '.',
  path: '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System',
  exports: {},
  filename: '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System/app.js',
  loaded: false,
  children: [],
  paths: [
    '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System/node_modules',
    '/Volumes/T7 Shield/mosh-nodejs/node_modules',
    '/Volumes/T7 Shield/node_modules',
    '/Volumes/node_modules',
    '/node_modules'
  ]
}
```



## Creating a Module

```js
// logger.js
var url = 'http://logger.io/log'

function log(message) {
  console.log(message);
}

module.exports.log = log;
console.log(module);
```

 ```js
 {
   id: '.',
   path: '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System',
   exports: { log: [Function: log] },
   filename: '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System/logger.js',
   loaded: false,
   children: [],
   paths: [
     '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System/node_modules',
     '/Volumes/T7 Shield/mosh-nodejs/node_modules',
     '/Volumes/T7 Shield/node_modules',
     '/Volumes/node_modules',
     '/node_modules'
   ]
 }
 ```

## Loading a Module

```js
// app.js
const loggerModule = require('./logger')
console.log(loggerModule);
loggerModule.log('hahaha')
```

```js
{ log: [Function: log] }
```

## Module Wrapper Function

```js
// MWF -- Immediately Invoked Function
// (const) exports === module.exports
(function (exports, require, module, __filename, __dirname) {
  ......
})();
```

## Path Module

```js 
const path = require('path')

const pathObj = path.parse(__filename);

console.log(pathObj);
```

```js
{
  root: '/',
  dir: '/Volumes/T7 Shield/mosh-nodejs/02-Node-Module-System',
  base: 'app.js',
  ext: '.js',
  name: 'app'
}
```

## OS Module

```js
const os = require('os')

const total = os.totalmem() / (1024*1024*1024);
const free = os.freemem() / (1024*1024*1024);

console.log(`Total Memory: ${total}\nFree Memory: ${free}`);
```

## FS Module

```js
const fs = require('fs')

const files = fs.readdirSync('.');
console.log(files);

fs.readdir('$', (err, files) => {
  if (err) console.log(`Error: ${err}`);
  else console.log(files);
})
```

## Events Module

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener
emitter.on('message', (arg) => {
  console.log(arg)
  console.log('message listener called!')
})

// raise a events
// pass data to event listener
emitter.emit('message', {id: 1, url: 'crud.org'});
```

## HTTP Module

```js
const http = require('http');

const server = http.createServer();

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello Client ~')
    res.end();
  }
});

//server.on('connection', () => {
//  console.log('New Connection ...');
//});

server.listen(3000, () => {
  console.log('server listening on port 3000 ...');
})
```































