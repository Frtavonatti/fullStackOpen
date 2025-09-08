-- Task: Create the blogs table and add at least two blogs
--
-- 1. Create the blogs table with the following columns:
--    - id (unique and auto-incrementing identifier)
--    - author (text string)
--    - url (text string, cannot be empty)
--    - title (text string, cannot be empty)
--    - likes (integer with default value zero)
--
-- 2. Insert at least two blogs into the database


-- UTILS
-- Command to start psql from the terminal:
-- docker exec -it blogapp-postgres-1 psql -U test -d blogApp

-- Command to list the blogs from the blogs table
-- docker exec blogapp-postgres-1 psql -U test -d blogApp -c "SELECT * FROM blogs;"


CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Sigmund Freud', 'freud.com', 'Die Traumdeutung');
INSERT INTO blogs (author, url, title, likes) VALUES ('Jacques Lacan', 'lacan.com', 'Écrits', 5);