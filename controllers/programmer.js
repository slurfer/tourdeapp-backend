const Programmer = require("../models/programmer");

exports.postProgrammer = (req, res, next) => {
  console.log(req.body);
  Programmer.create({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  })
    .then((programmer) => {
      res.json(programmer);
    })
    .catch((err) => console.log(err));
};
