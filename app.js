const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const recordRoutes = require("./routes/record");
const programmerRoutes = require("./routes/programmer");
const tagRoutes = require("./routes/tag");

const sequelize = require("./util/database");
const Programmer = require("./models/programmer");
const Record = require("./models/record");
const Tag = require("./models/tag");
const TagItem = require("./models/tag-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // Replace * with the specific origin(s) you want to allow, e.g., 'http://example.com'
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/record", recordRoutes);

app.use("/programmer", programmerRoutes);

app.use("/tag", tagRoutes);

Record.belongsTo(Programmer, { constrains: true, onDelete: "CASCADE" });
Programmer.hasMany(Record);
Tag.belongsTo(Programmer, { constrains: true, onDelete: "CASCADE" });
Programmer.hasMany(Tag);
Record.belongsToMany(Tag, { through: TagItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return Programmer.findByPk(1);
  })
  .then((programmer) => {
    if (!programmer) {
      return Programmer.create({
        name: "Master",
        surname: "Admin",
        username: "admin",
        email: "it@scg.cz",
        password: "123456",
        admin: true,
      });
    }
    Promise.resolve(programmer);
  })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));
