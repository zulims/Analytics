USE sakila;

-- 1a.
SELECT first_name, last_name FROM actor;

-- 1b.
SELECT CONCAT(first_name, ' ', last_name) AS 'Actor Name' FROM actor;

-- 2a.
SELECT actor_id, first_name, last_name FROM actor WHERE first_name = 'joe';

-- 2b.
SELECT * FROM actor WHERE last_name LIKE '%GEN%';

-- 2c.
SELECT * FROM actor WHERE last_name LIKE '%LI%' ORDER BY last_name, first_name;

-- 2d.
SELECT country_id, country FROM country WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

-- 3a.
ALTER TABLE actor 
ADD middle_name VARCHAR(45) AFTER first_name;
    
-- 3b.
ALTER TABLE actor
MODIFY COLUMN middle_name blob;

-- 3c.
ALTER TABLE actor DROP COLUMN middle_name;

-- 4a.
SELECT DISTINCT last_name as last, (SELECT COUNT(*) FROM actor WHERE last_name = last) AS 'Count' FROM actor;

-- 4b.
SELECT DISTINCT last_name as last, (SELECT COUNT(*) FROM actor WHERE last_name = last) AS Count FROM actor HAVING Count > 1;

-- 4c.
UPDATE actor SET first_name = 'HARPO' WHERE first_name = 'groucho' AND last_name = 'williams';

-- 4d.
UPDATE actor SET first_name = CASE WHEN first_name='GROUCHO' THEN 'MUCHO GROUCHO' WHEN first_name='HARPO' THEN 'GROUCHO' ELSE first_name END;

-- 5a.
CREATE TABLE new_address_table (
	address_id smallint(5) NOT NULL AUTO_INCREMENT,
    address varchar(50) NOT NULL,
    address2 varchar(50),
    district varchar(20) NOT NULL,
    city_id smallint(5) NOT NULL,
    postal_code varchar(10),
    phone varchar(20) NOT NULL,
    location geometry NOT NULL,
    last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (address_id)
);

-- 6a.
SELECT staff.first_name, staff.last_name, address.address 
FROM staff
JOIN address ON staff.address_id=address.address_id;

-- 6b.
SELECT DISTINCT staff.staff_id AS id, staff.first_name, staff.last_name, (SELECT SUM(amount) FROM payment WHERE staff_id = id AND payment_date LIKE '%2005-08%') AS payments
FROM staff
JOIN payment ON staff.staff_id=payment.staff_id;

-- 6c.
SELECT DISTINCT title, (SELECT COUNT(actor_id) FROM film_actor WHERE film.film_id=film_actor.film_id)
FROM film 
INNER JOIN film_actor ON film_actor.film_id=film.film_id;

-- 6e.
SELECT COUNT(inventory_id) FROM inventory
INNER JOIN film ON film.film_id=inventory.film_id
WHERE title = 'Hunchback Impossible';

-- 7a.
SELECT DISTINCT title FROM film
WHERE LEFT(title, 1) LIKE '%q%' OR LEFT(title, 1) LIKE '%k%'
AND language_id=(SELECT language_id FROM language WHERE name = 'English');

-- 7b.
SELECT actor_id AS id, 
(SELECT first_name FROM actor WHERE actor_id=id) AS First_Name, 
(SELECT last_name FROM actor WHERE actor_id=id) AS Last_Name 
FROM film_actor
WHERE film_id=(SELECT film_id FROM film WHERE title='Alone Trip');

-- 7c.
SELECT customer.first_name, customer.last_name, customer.email FROM customer
JOIN address ON address.address_id = customer.address_id
JOIN city ON city.city_id = address.city_id
JOIN country ON country.country_id = city.country_id
WHERE country = 'Canada';

-- 7d.
SELECT film.title FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE category.name = 'Family';

-- 7e.
SELECT title, (COUNT(rental.rental_id)) AS times_rented FROM rental
JOIN inventory ON inventory.inventory_id = rental.inventory_id
JOIN film ON inventory.film_id = film.film_id
GROUP BY title
ORDER BY times_rented DESC;

-- 7f.
SELECT store.store_id, SUM(amount) AS sales FROM store
JOIN staff ON store.store_id=staff.store_id
JOIN payment ON staff.staff_id=payment.staff_id
GROUP BY store.store_id;

-- 7g.
SELECT store.store_id, city.city, country.country FROM store
JOIN address ON store.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id;

-- 7h.
SELECT category.name, SUM(payment.amount) AS sales FROM category
JOIN film_category ON film_category.category_id = category.category_id
JOIN film ON film.film_id = film_category.film_id
JOIN payment ON payment.rental_id=film.film_id
GROUP BY category.name
ORDER BY sales DESC
LIMIT 5;

-- 8a.
CREATE VIEW top_5_genres AS
SELECT category.name, SUM(payment.amount) AS sales FROM category
JOIN film_category ON film_category.category_id = category.category_id
JOIN film ON film.film_id = film_category.film_id
JOIN payment ON payment.rental_id=film.film_id
GROUP BY category.name
ORDER BY sales DESC
LIMIT 5;

-- 8b.
SELECT * FROM top_5_genres;

-- 8c.
DROP VIEW top_5_genres;