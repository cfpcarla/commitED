-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests (
  id SERIAL PRIMARY KEY NOT NULL,
  opportunity_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  status VARCHAR(255)
);
