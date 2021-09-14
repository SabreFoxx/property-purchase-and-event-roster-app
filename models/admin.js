import env from 'dotenv';
import * as sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
env.config();

const { Model } = sequelize.default || sequelize;

export default (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * Login a user using email and password
     * @param {string} email email address
     * @return {Promise}
     */
    static loginUsing(email, plainPassword) {
      return Admin.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (user == null)
          return null;
        if (user.isPasswordValid(plainPassword)) return user;
        else return null;
      }).catch(err => console.log(err));
    };

    /**
     * creates a password hash, from the plain string
     * @param {string} plainPassword plain password string
     */
    setPassword(plainPassword) {
      this.setDataValue('passwordSalt', crypto.randomBytes(16).toString('hex'));
      this.setDataValue('password', crypto
        .pbkdf2Sync(plainPassword, this.passwordSalt, 1000, 64, 'sha512')
        .toString('hex'));
    }

    /**
     * is the plain password correct?
     * @param {string} plainPassword plain password string
     */
    isPasswordValid(plainPassword) {
      const passwordHash = crypto
        .pbkdf2Sync(plainPassword, this.getDataValue('passwordSalt'), 1000, 64, 'sha512')
        .toString('hex');
      return this.getDataValue('password') === passwordHash;
    }

    /**
     * generates a signed jwt token for this user account object
     */
    generateJwt() {
      const expiry = new Date;
      expiry.setDate(expiry.getDate() + 7);
      return jwt.sign({
        email: this.getDataValue('email'),
        exp: parseInt(expiry.getTime() / 1000, 10)
      }, process.env.JWT_SECRET);
    }
  };

  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordSalt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};