CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(2000) NOT NULL,
  phone_number int NULL
);

CREATE TABLE rooms_available (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  title varchar(50) NOT NULL,
  address varchar(140) NOT NULL,
  host varchar(50) NOT NULL,
  bedrooms int NOT NULL,
  beds int NULL,
  amenities varchar(140) NOT NULL,
  dates varchar(140) NOT NULL,
  start_date varchar(20) NOT NULL,
  images varchar(2000) NULL,
  score int NULL,
  total_nights int NOT NULL,
  available bit NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bookings (
  user_id int NOT NULL,
  rooms varchar(2000) NOT NULL,
  dates varchar(2000) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
