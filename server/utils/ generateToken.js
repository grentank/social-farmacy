require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig.js");

const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

// * payload - полезная нагрузка - user { name, email, ....}
const generateToken = (payload) => ({
  accessToken: jwt.sign(payload, ACCESS_TOKEN, jwtConfig.access),
  refreshToken: jwt.sign(payload, REFRESH_TOKEN, jwtConfig.refresh),
});

module.exports = generateToken;
