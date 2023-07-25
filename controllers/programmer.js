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

exports.getProgrammers = (req, res, next) => {
  Programmer.findAll()
    .then((programmers) => {
      res.json(programmers);
    })
    .catch((err) => console.log(err));
};

exports.deleteProgrammers = (req, res, next) => {
  programmerId = req.params.programmerId;
  Programmer.findByPk(programmerId)
    .then((programmer) => programmer.destroy())
    .then(res.status(200).send("Success."))
    .catch((err) => console.log(err));
};

exports.putProgrammers = (req, res, next) => {
  programmerId = req.params.programmerId;
  Programmer.findByPk(programmerId)
    .then((programmer) => {
      if (req.body.name) {
        programmer.name = req.body.name;
      }
      if (req.body.surname) {
        programmer.surname = req.body.surname;
      }
      if (req.body.username) {
        programmer.username = req.body.username;
      }
      if (req.body.email) {
        programmer.email = req.body.email;
      }
      if (req.body.password) {
        programmer.password = req.body.password;
      }
      if (req.body.admin) {
        programmer.admin = req.body.admin;
      }
      return programmer.save();
    })
    .then((programmer) => {
      res.json(programmer);
    })
    .catch((err) => console.log(err));
};
