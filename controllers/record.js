const Programmer = require("../models/programmer");
const Record = require("../models/record");

exports.getRecord = (req, res, next) => {
  Record.findAll({ include: ["tags"] })
    .then((records) => {
      let recorsdWithTags = records.map((record) => {
        let r = record.dataValues;
        r.tagIds = r.tags.map((tag) => tag.id);
        delete r.tags;
        return r;
      });
      console.log(recorsdWithTags);
      res.json(records);
    })
    .catch((err) => console.log(err));
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
      if (req.body.tagIds) {
        return record.addTags(req.body.tagIds).then((result) => {
          return record;
        });
      } else {
        return record;
      }
    })
    .then((record) => {
      return record
        .getTags()
        .then((tags) => {
          recordWithTags = { ...record.dataValues };
          recordWithTags.tagIds = tags.map((tag) => tag.id);
          return recordWithTags;
        })
        .catch((err) => console.log(err));
    })
    .then((record) => {
      console.log(record);
      res.json(record);
    })
    .catch((err) => console.log(err));
};
