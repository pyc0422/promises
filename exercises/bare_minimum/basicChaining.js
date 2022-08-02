/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var writeFile = require('./promisification');
var readFile = require('./promiseConstructor');
var writeFileAsync = Promise.promisify(fs.writeFile); //no need for cb function


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return readFile.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      if (user) {
        return writeFile.getGitHubProfileAsync(user);
      } else {
        console.log('eeeee');
      }
    })
    .then(function(data) {
      return writeFileAsync(writeFilePath, JSON.stringify(data));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
