-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS opportunities CASCADE;
CREATE TABLE opportunities (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  date_posted DATE NOT NULL,
  user_id INT NOT NULL,
  longitude VARCHAR(255),
  latitude VARCHAR(255)
);
