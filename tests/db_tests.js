const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getQueryData = require("../src/queries/getQueryData");

const getAllCars = "select * from cars;";
const getCarOne = "select * from cars where car_id=1;";
const getAllUsers = "select * from users;";
const getUserOne = "select * from users where user_id=1;";
const availableCars = "SELECT * FROM cars where car_id NOT IN (SELECT cars.car_id from cars JOIN rentals ON cars.car_id=rentals.car_id WHERE (rentals.date_begin<='2019-10-14' AND rentals.date_return>='2019-10-14') OR (rentals.date_begin<='2019-11-27' AND rentals.date_return>='2019-11-27') OR (rentals.date_begin>='2019-10-14' AND rentals.date_return <= '2019-11-27'));"

tape("Testing getAllCars query", t => {
  runDbBuild((err, res) => {
    getQueryData(getAllCars, (err, res) => {
      const expected = [{
          car_id: 1,
          model: 'Mazda Lantis',
          plate_number: '74-416-76',
          imgurl: 'https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg'
        },
        {
          car_id: 2,
          model: 'Seat Leon',
          plate_number: '76-456-12',
          imgurl: 'https://www.seat.co.il/wp-content/uploads/2017/07/new-seat-leon-5-doors-boheme-purple.png'
        },
        {
          car_id: 3,
          model: 'Renault Clio',
          plate_number: '85-666-23',
          imgurl: 'https://www.renault.co.il/CountriesData/Israel/images/cars/clio/product/clio-gallery1_ig_w1500_h843.jpg'
        }
      ];

      t.deepEquals(res, expected);
      t.end();
    })
  })
})


tape("Testing get car with id 1 query", t => {
  runDbBuild((err, res) => {
    getQueryData(getCarOne, (err, res) => {
      const expected = {
        car_id: 1,
        model: 'Mazda Lantis',
        plate_number: '74-416-76',
        imgurl: 'https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg'
      }
      t.deepEquals(res[0], expected);
      t.end();
    })
  })
})

tape("Testing getAllUsers query", t => {
  runDbBuild((err, res) => {
    getQueryData(getAllUsers, (err, res) => {
      const expected = [{
          user_id: 1,
          first_name: 'Omri',
          last_name: 'Zaher',
          city: 'Osfia',
          phone: '0526086317'
        },
        {
          user_id: 2,
          first_name: 'Karem',
          last_name: 'Omary',
          city: 'Sandala',
          phone: '0544791675'
        }
      ]
      t.deepEquals(res, expected);
      t.end();
    })
  })
})
tape("Testing get user with id 1 query", t => {
  runDbBuild((err, res) => {
    getQueryData(getUserOne, (err, res) => {
      const expected = {
        user_id: 1,
        first_name: 'Omri',
        last_name: 'Zaher',
        city: 'Osfia',
        phone: '0526086317'
      }
      t.deepEquals(res[0], expected);
      t.end();
    })
  })
})

/* this test valid for a specific dates */
tape("Testing availables cars query", t => {
  runDbBuild((err, res) => {
    getQueryData(availableCars, (err, res) => {
      const expected = [{
          car_id: 2,
          model: 'Seat Leon',
          plate_number: '76-456-12',
          imgurl: 'https://www.seat.co.il/wp-content/uploads/2017/07/new-seat-leon-5-doors-boheme-purple.png'
        },
        {
          car_id: 3,
          model: 'Renault Clio',
          plate_number: '85-666-23',
          imgurl: 'https://www.renault.co.il/CountriesData/Israel/images/cars/clio/product/clio-gallery1_ig_w1500_h843.jpg'
        }
      ]
      t.deepEquals(res, expected);
      t.end();
    })
  })
})