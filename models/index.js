import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let jsonData = fs.readFileSync(__dirname + '/../config/config.json'); // read json file
let config = JSON.parse(jsonData)[env]; // extract configuration from json file
const db = {};

console.log('Loading sequelize...');
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

let modelFiles = fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  });
let iterations = 0;
modelFiles.forEach(async file => {
  try {
    let fetchedModule = await import(path.join(__dirname, file));
    const model = fetchedModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    ++iterations;
  } catch (err) { console.log(err) }

  if (iterations == modelFiles.length)
    // Call the associate() static method for models
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
