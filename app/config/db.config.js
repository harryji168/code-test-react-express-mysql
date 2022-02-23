module.exports = {
  HOST: "localhost",
  USER: "harry",
  PASSWORD: "password",
  DB: "react_nodejs_code_test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
