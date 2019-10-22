BEGIN;

  DROP TABLE IF EXISTS users, cars, rentals;

  CREATE TABLE
  IF NOT EXISTS users
  (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL
);

INSERT INTO users
  (first_name,last_name,city,phone)
VALUES
  ('Omri', 'Zaher', 'Osfia', '0526086317');

CREATE TABLE
IF NOT EXISTS cars
(
  car_id SERIAL PRIMARY KEY,
  model TEXT NOT NULL,
  plate_number TEXT NOT NULL,
  imgUrl TEXT 
);

INSERT INTO cars
  (model,plate_number,imgUrl)
VALUES
  ('Mazda Lantis', '74-416-76', 'https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg');

CREATE TABLE
IF NOT EXISTS rentals
(
  rental_id INTEGER NOT NULL,
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

COMMIT;
