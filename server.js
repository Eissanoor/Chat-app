const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "assets/uploads")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
const routerbook = require("./routes/home");
const routeruser = require("./routes/register");
const routeorder = require("./routes/orderroute");
const flash = require("connect-flash");
app.use(flash());
const body = require("body-parser").urlencoded({ extended: true });
app.use(body);

//
require("./cons");
//

//beginSessions
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/library",
  collection: "sessions",
});

app.use(
  session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//endSession

app.use("/", routeorder);

app.use("/", routeruser);

app.use("/", routerbook);

global.year = new Date().getFullYear();
global.storename = "White Book Store";
global.understorename = "Programming books only";
global.icon = "img/icon.png";

app.get("/about", (req, res) => {
  res.render("about", {
    verifuser: req.session.userId,
    namestore: namestore,
    desc: description,
    namefounder: namefounder,
    descfounder: descfounder,
    imgfounder: imgfounder,
    aboutimg: aboutimg,
    aboutimg2: aboutimg2,
    historydesc: historydesc,
  });
});

//generale about info
const namestore = "white book store";
const description =
  "white book store is the digital store which sell programming books online. We are dedicated to creating “a world enlightened by reading” by selling the industry’s largest catalog of books..";
const namefounder = "Kessemtini Ayoub";
const descfounder = "Freelancer and already studing ";
const imgfounder = "img/founder.jpg";
const aboutimg = "img/aboutimg.jpg";
const aboutimg2 = "img/aboutimg2.jpg";
const historydesc =
  "white book store founded in dec 2021 , specializes on selling programming books around the world. Our goal is to help people whose need to learn more about programming . We will keep working in these endeavors.";
//

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("running on port 3000"));
