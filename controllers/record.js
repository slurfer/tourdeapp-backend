const Programmer = require("../models/programmer");
const Record = require("../models/record");

exports.getRecord = (req, res, next) => {
  const record = {
    date: "2022-12-28",
    programmingLanguage: "python",
    timeSpent: 20,
    rating: 3,
    tagIds: [2],
    programmerId: 1,
    description: "So this is, good.",
  };
  res.json(record);
};

exports.postRecord = (req, res, next) => {
  const newRecord = {
    date: req.body.date,
    programmingLanguage: req.body.programmingLanguage,
    timeSpent: req.body.timeSpent,
    rating: req.body.rating,
    description: req.body.description,
  };
  Promise.resolve()
    .then(() => {
      if (req.body.programmerId) {
        return Programmer.findByPk(req.body.programmerId).then((programmer) => {
          return programmer.createRecord(newRecord);
        });
      } else {
        return Record.create(newRecord);
      }
    })
    .then((record) => {
      console.log(record);
      res.json(record);
    })
    .catch((err) => console.log(err));
};
