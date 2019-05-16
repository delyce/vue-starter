const program = require("commander");

program
  .version('1.0.0')
  .option('-p, --port <n>', 'Port No.', 3000)
  .parse(process.argv);

const config = {
  PORT: program.port || 3000
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/get/:name', function(req, res, next){
  res.json({
    message: 'Request: ' + req.params.name
  });
});

app.listen(config.PORT, function(){
  console.log('Starting up Express, Listen: ' + config.PORT);
  console.log('Hit CTRL-C to stop the server');
});
