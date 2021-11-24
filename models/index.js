import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import env from 'dotenv';
import pg from 'pg'; // see below for purpose
env.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
const environment = process.env.NODE_ENV || 'development';

let jsonData = fs.readFileSync('config/config.json'); // read json file
let config = JSON.parse(jsonData)[environment]; // extract configuration from json file
const db = {};

console.log('loading sequelize...');
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // in my serverless.yml file after adding the below
  // ignorePackages:
  //   - pg-native
  // I need to configure dialectModule
  config['dialectModule'] = pg; // to prevent an error when using the serverless framework
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// returns true if we're in AWS Lambda
// false if we're in another environment such as my local computer or ec2 container
const isLambda = !!process.env.LAMBDA_TASK_ROOT;
// serverless-bundle copies my models to the root directory after bundling
const modelsDirectory = isLambda ? './' : './models/';

const modelFiles = fs.readdirSync(modelsDirectory)
  .filter(file => {
    return (file.indexOf('.') !== 0)
      // in case we're in lambda, and since all js files are
      // in root, we wouldn't want to import 'app.js' again
      && (file !== basename && file !== 'app.js')
      && (file.slice(-3) === '.js');
  });

console.log('...loading models...')
console.log(modelFiles);
let count = 0;
for (let file of modelFiles) {
  try {
    // remove .js extension if we're in lambda since we're using webpack
    // and require() doesn't need the extension
    // append with ./ if we're using es6 dynamic import
    file = isLambda ? file.slice(0, -3) : `./${file}`;
    import(file).then(fetchedModule => {
      const model = fetchedModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`...loaded model ${model.name}...`);
      ++count;
    })
  } catch (err) { console.log(err) }

  if (count == modelFiles.length)
    // Call the associate() static method for models
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
}

export { db as default, sequelize };
