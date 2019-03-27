require('dotenv').config();

const http = require('http');
const ctrl = require('./functions/notify-for-kitchen-duty');

const PORT = process.env.PORT || 3000;

http.createServer(ctrl).listen(PORT);
