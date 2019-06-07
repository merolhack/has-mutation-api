const dotenv = require('dotenv');
const result = dotenv.config();

let envs;

if (!('error' in result)) {
  envs = result.parsed;
} else {
  envs = {};
  console.log(process.env);
  for (var property in process.env) {
    if (object.hasOwnProperty(property)) {
        envs[property] = process.env[property];
    }
  }
}

module.exports = envs;