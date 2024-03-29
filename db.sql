CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL, 
    price_range INT NOT NULL check(price_range >= 1 and price_range <=5)
);


INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'New York', 3);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGSERIAL NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

ALTER TABLE restaurants ADD CONSTRAINT restaurants_pk PRIMARY KEY (id);