#!/usr/bin/env node
const argv = require("yargs");
const chalk = require("chalk");
const fs = require("fs");

function fileExists(filepath) {
  // check if file exists
  if(fs.existsSync(filepath)) {
    return true;
  } else {
    console.log(chalk.cyan(`${filepath} does not exist, skipping...`));
  }
}

function writeToFile(filepath, data, version){
  data.version = version
  fs.writeFile(filepath, JSON.stringify(data, null, 4),
      // callback function that is called after writing file is done
      function(err) {
          if (err) throw err;
          console.log(chalk.green(`^${filepath} updated version -> ${version}`));
  });
}

function bumpThatVesion(filepath, version){
  try {
    fs.readFile(filepath,
        function(err, data) {
            // json data
            if (err) {
              console.log(chalk.error(`Could not read data from file!`));
              exit(1)
            }
            data.version = version;
            return writeToFile(filepath, JSON.parse(data), version)
    });
  } catch (e) {
    console.log(chalk.error(`${e}`));
  }

}

argv.command(
  "bump",
  "Bump version to composer.json, package.json",
  (yargs) => {},
  (argv) => {
    if (fileExists('./composer.json')) {
        bumpThatVesion('./composer.json', argv._[1])
    }
  }
).argv;
