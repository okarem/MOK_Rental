const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");

tape("Testing getCars Function", t => {
  runDbBuild((err, res) => {
    getData((err, res) => {

      const expected = {
        car_id: 1,
        model: 'Mazda Lantis',
        plate_number: '74-416-76',
        imgurl: 'https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg'
      };

      t.deepEquals(res[0], expected, `the result should be ${expected}`);
      t.end();
    })
  })

})