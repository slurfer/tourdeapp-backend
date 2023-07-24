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
  const tagId = req.params.tagId;
  Tag.findByPk(tagId)
    .then((tag) => tag.destroy())
    .then(res.status(200).send("Success."))
    .catch((err) => console.log(err));
};

exports.putTags = (req, res, next) => {
  const tagId = req.params.tagId;
  Tag.findByPk(tagId)
    .then((tag) => {
      if (req.body.name) {
        tag.name = req.body.name;
      }
      if (req.body.color) {
        tag.color = req.body.color;
      }
      if (req.body.description) {
        tag.description = req.body.description;
      }
      return tag.save();
    })
    .then((tag) => res.json(tag))
    .catch((err) => console.log(err));
};
