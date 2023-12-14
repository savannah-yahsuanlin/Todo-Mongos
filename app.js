const express = require('express');
const app = express();
const client = require('./db/connect');
const tasks = require('./routes/tasks');
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 4000;

const init = async() => {
 try {
   await client.connect()
   app.listen(port, () => {console.log(`listening on port ${port}`)})
 } catch (err) {
    console.error(err)
  }
}


init()
