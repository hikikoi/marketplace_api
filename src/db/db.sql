CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  user_agent VARCHAR(255),
  user_device VARCHAR(255)
  device_model VARCHAR(100),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subcategory_id INTEGER REFERENCES subcategories(id),
  deleted_at TIMESTAMPTZ,
  cart_count INTEGER
);

CREATE OR REPLACE FUNCTION soft_delete_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.deleted_at IS NULL THEN
    NEW.deleted_at = NOW();
    RETURN NEW;
  ELSE
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER soft_delete
BEFORE DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION soft_delete_trigger();


  CREATE TABLE cart (
      id SERIAL NOT NULL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users (id),
      product_id INT NOT NULL REFERENCES products (id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );