module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    name: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.STRING
    } 
  });

  return Student;
};
