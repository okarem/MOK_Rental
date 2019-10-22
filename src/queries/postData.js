const databaseConnection = require("../database/db_connection.js");

const postData = (car_id, user_id, date_begin, date_return, cb) => {
  databaseConnection.query(
    "INSERT INTO rentals (car_id,user_id, date_begin,date_return) VALUES ($1, $2,$3,$4)",
    [car_id, user_id, date_begin, date_return],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = postData;
