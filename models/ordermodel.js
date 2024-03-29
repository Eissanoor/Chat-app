const mongoose = require("mongoose");

var order = mongoose.model("order", {
  _id: mongoose.ObjectId,
  firstname: String,
  lastname: String,
  phonenumber: String,
  street: String,
  city: String,
  zipcode: String,
  booklink: String,
  ordered: Boolean,
});

var url = process.env.DB || "mongodb://localhost:27017/library";

exports.addorder = (
  firstname,
  lastname,
  phonenumber,
  street,
  city,
  zipcode,
  booklink,
  ordered
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return order
          .insertMany({
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            street: street,
            city: city,
            zipcode: zipcode,
            booklink: booklink,
            ordered: ordered,
          })
          .then((order) => {
            mongoose.disconnect();
            resolve(order);
            console.log(order);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
            console.log(err);
          });
      })
      .then((err) => console.log(err));
  });
};

exports.getallorders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return order.find({});
      })
      .then((orders) => {
        mongoose.disconnect;
        resolve(orders);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  }).catch((err) => reject(err));
};

exports.endorder = (id, end) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return order.updateOne({ _id: id }, { ordered: end });
      })
      .then((order) => {
        mongoose.disconnect;
        resolve(order);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  }).catch((err) => reject(err));
};
