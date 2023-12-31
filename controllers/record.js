const Programmer = require("../models/programmer");
const Record = require("../models/record");

const getRecordWithTags = (record) => {
  return record
    .getTags()
    .then((tags) => {
      recordWithTags = { ...record.dataValues };
      recordWithTags.tagIds = tags.map((tag) => tag.id);
      return recordWithTags;
    })
    .catch((err) => console.log(err));
};

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
      return getRecordWithTags(record);
    })
    .then((record) => {
      console.log(record);
      res.json(record);
    })
    .catch((err) => console.log(err));
};

exports.deleteRecord = (req, res, next) => {
  recordId = req.params.recordId;
  Record.findByPk(recordId)
    .then((record) => record.destroy())
    .then(res.status(200).send("Success."))
    .catch((err) => console.log(err));
};

exports.putRecord = (req, res, next) => {
  recordId = req.params.recordId;
  Record.findByPk(recordId)
    .then((record) => {
      if (req.body.date) {
        record.date = req.body.date;
      }
      if (req.body.programmingLanguage) {
        record.programmingLanguage = req.body.programmingLanguage;
      }
      if (req.body.timeSpent) {
        record.timeSpent = req.body.timeSpent;
      }
      if (req.body.rating) {
        record.rating = req.body.rating;
      }
      if (req.body.description) {
        record.description = req.body.description;
      }
      return record.save();
    })
    .then((record) => {
      if (req.body.tagIds) {
        console.log(record)
        return record.setTags(null).then((result) => {
          return record.addTags(req.body.tagIds).then((result) => {
            return getRecordWithTags(record);
          });
        });
      } else {
        return getRecordWithTags(record);
      }
    })
    .then((record) => res.json(record))
    .catch((err) => console.log(err));
};
