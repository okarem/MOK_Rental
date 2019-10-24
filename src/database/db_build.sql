BEGIN;

  DROP TABLE IF EXISTS users, cars, rentals;

  CREATE TABLE
  IF NOT EXISTS users
  (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(10) NOT NULL,
  last_name VARCHAR(10) NOT NULL,
  city VARCHAR(10) NOT NULL,
  phone varchar(22) NOT NULL
);

INSERT INTO users
  (first_name,last_name,city,phone)
VALUES
  ('Omri', 'Zaher', 'Osfia', '0526086317'),('Karem','Omary','Sandala','0544791675');

CREATE TABLE
IF NOT EXISTS cars
(
  car_id SERIAL PRIMARY KEY,
  model VARCHAR(10) NOT NULL,
  plate_number VARCHAR(10) NOT NULL,
  imgUrl TEXT 
);

INSERT INTO cars
  (model,plate_number,imgUrl)
VALUES
  ('Mazda Lantis', '74-416-76', 'https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg'),('Seat Leon','76-456-12','https://www.seat.co.il/wp-content/uploads/2017/07/new-seat-leon-5-doors-boheme-purple.png'),('Renault Clio','85-666-23','https://www.renault.co.il/CountriesData/Israel/images/cars/clio/product/clio-gallery1_ig_w1500_h843.jpg');

CREATE TABLE
IF NOT EXISTS rentals
(
  rental_id SERIAL NOT NULL,
  car_id INTEGER,
  user_id INTEGER,
  date_begin DATE NOT NULL DEFAULT CURRENT_DATE,
  date_return DATE NOT NULL,
  PRIMARY KEY
(rental_id,car_id,user_id),
  FOREIGN KEY
(car_id) REFERENCES cars
(car_id),
  FOREIGN KEY
(user_id) REFERENCES users
(user_id)
);

INSERT INTO rentals (rental_id,car_id,user_id,date_begin,date_return) VALUES (1,1,1,'2019-11-14','2019-11-17');

COMMIT;
