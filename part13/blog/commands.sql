CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs 
  (author, url, title, likes) VALUES (
    'John Doe', 'https://example.com/blog1', 'My First Blog Post', 10), 
    ('Jane Smith', 'https://example.com/blog2', 'My Second Blog Post', 5
  );