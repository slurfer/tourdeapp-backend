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
    .then(programmer => programmer.destroy())
    .then(res.status(200).send('Success.'))
    .catch((err) => console.log(err));
};
