#!/usr/bin/env node
const argv = require("yargs");
const chalk = require("chalk");
const fs = require("fs");


function parseVersion(str) {
    // parse version ... and even there is dev/beta etc 
    // composer fails 2.6.0-dev.4!
    if (typeof(str) != 'string') { return false; }
    var arr = str.split('.');
    // parse int or default to 0
    var maj = parseInt(arr[0]) || 0;
    var min = parseInt(arr[1]) || 0;
    var rest = parseInt(arr[2]) || 0;
    return `${maj}.${min}.${rest}`
}

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
            version = parseVersion(version);
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
    if (fileExists('./package.json')) {
        bumpThatVesion('./package.json', argv._[1])
    }

  }
).argv;
