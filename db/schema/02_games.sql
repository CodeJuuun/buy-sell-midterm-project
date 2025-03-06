DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price_cents INTEGER NOT NULL,
  condition TEXT NOT NULL,
  system_id INTEGER REFERENCES systems(id) ON DELETE CASCADE,
  is_sold BOOLEAN NOT NULL DEFAULT false,
  description TEXT
);