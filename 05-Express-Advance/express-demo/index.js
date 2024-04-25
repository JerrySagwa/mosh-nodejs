const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const coursesRouter = require('./routes/courses')
const homeRouter = require('./routes/home')

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

startupDebugger('App starts ...');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
startupDebugger('Config loaded ...');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRouter);

app.use('/api/courses', coursesRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Sever listening on port ${port}`));
