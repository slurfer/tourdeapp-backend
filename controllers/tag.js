const Tag = require("../models/tag");
const Programmer = require("../models/programmer");

exports.postTag = (req, res, next) => {
  const newTag = {
    name: req.body.name,
    color: req.body.color,
    description: req.body.description,
  };
  Programmer.findByPk(req.body.programmerId)
    .then((programmer) => {
      return programmer.createTag(newTag);
    })
    .then((tag) => {
      console.log(tag);
      res.json(tag);
    })
    .catch((err) => console.log(err));
};

exports.getTags = (req, res, next) => {
  Tag.findAll()
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => console.log(err));
};

exports.deleteTags = (req, res, next) => {
  tagId = req.params.tagId;
  Tag.findByPk(tagId)
    .then(tag => tag.destroy())
    .then(res.status(200).send("Success."))
    .catch((err) => console.log(err));
};
