const express = require('express');
const app = express();
const routes = require('./routes.js');
const chalk = require("chalk");
const { performance } = require("perf_hooks");

const startTime = performance.now();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/', routes);

const endTime = performance.now();
const executionTime = endTime - startTime;

const port = process.env.PORT ? Number(process.env.PORT) : 5500;

app.listen(port, () => {
  console.log(
    chalk.dim(`> ready in ${executionTime.toFixed(0)} ms \n`)
  );
  console.log(
    chalk.green("  ➜ "),
    chalk.bold("Local:  "),
    chalk.cyanBright(`http://localhost:${chalk.bold(port)}/\n`)
  );
});