import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import env from 'dotenv';
import pg from 'pg'; // see below for purpose
env.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const environment = process.env.NODE_ENV || 'development';

const jsonData = fs.readFileSync('config/config.json'); // read json file
const config = JSON.parse(jsonData)[environment]; // extract configuration from json file

console.log('loading sequelize and connecting to database...');
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // in my serverless.yml file after adding the below
  config['dialectModule'] = pg; // to prevent an error when using the serverless framework
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// returns true if we're in AWS Lambda
// false if we're in another environment such as my local computer or ec2 container
const isLambda = !!process.env.LAMBDA_TASK_ROOT;
const loadModels = isLambda ? serverlessLoader : localLoader;

// localLoader is used for EC2 instances as well
async function localLoader() {
  const modelFiles = fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });

  let count = 0;
  let models = {};
  modelFiles.forEach(async file => {
    try {
      let fetchedModule = await import(path.join(__dirname, file));
      const model = fetchedModule.default(sequelize, Sequelize.DataTypes);
      models[model.name] = model;
      ++count;
    } catch (err) { console.error(err) }

    if (count == modelFiles.length)
      associate(models);
  });
  return models;
}

// lambda is having problems loading truly dynamically using webpack
// so we had to resort to this
async function serverlessLoader() {
  let modules = {};
  modules['Admin'] = await import('./admin.js');
  modules['Agenda'] = await import('./agenda.js');
  modules['Cohost'] = await import('./cohost.js');
  modules['DataStore'] = await import('./datastore.js');
  modules['Persona'] = await import('./persona.js');
  modules['Pin'] = await import('./pin.js');
  modules['Property'] = await import('./property.js');
  modules['PropertyCategory'] = await import('./propertycategory.js');
  modules['Sale'] = await import('./sale.js');
  modules['Seat'] = await import('./seat.js');
  modules['Speaker'] = await import('./speaker.js');

  let models = {};
  Object.keys(modules).forEach(name => {
    const model = modules[name].default(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  })

  return associate(models);
}

// Call the associate() static method for models
const associate = (models) => {
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
  return models;
}

export let models = {};

export const modelsLoader = async () => {
  models = await loadModels();
}

export { models as default, sequelize };
