# GoldenShelf
GoldenShelf is a Reading Log application that stores and display notes on books that user have already read.
![image](https://github.com/user-attachments/assets/d77c478d-338b-4a70-b18b-6d5709eee597)
![image](https://github.com/user-attachments/assets/c4827b86-4222-4ef4-a6ac-2aa943e0562c)
![image](https://github.com/user-attachments/assets/f4bc1c2b-0692-4807-a8ec-4c85f8ec5793)


HOW TO USE THIS REPO:
  1. initialize a postgres database.
  2. run this SQL query to initialize tabel and adding data:
     CREATE TABLE books(
      id SERIAL PRIMARY KEY,
      isbn TEXT,
      finished_date DATE,
      title TEXT,
      rating INTEGER,
      recency TEXT,
      notes TEXT
    ),
     INSERT INTO books (isbn, finished_date, title, rating, recency, notes)
VALUES
('9780743273565', '2023-01-15', 'The Great Gatsby', 9, 'Recently finished, still fresh in my mind.', 'A classic novel that explores themes of wealth, society, and the American Dream.'),
('9780140449136', '2022-11-22', 'Crime and Punishment', 8, 'It has been a few months, but still memorable.', 'Dostoevsky delves into deep psychological themes, making it a powerful read.'),
('9780451524935', '2023-03-02', '1984', 10, 'Just finished, and it left a lasting impact.', 'Orwell''s dystopian novel feels incredibly relevant in today''s world.'),
('9780060935467', '2023-07-09', 'To Kill a Mockingbird', 9, 'Recently read, and its themes are still resonating.', 'A moving story about justice, race, and moral growth.'),
('9781503280786', '2023-05-17', 'Moby-Dick', 7, 'A bit foggy, but still remember key parts.', 'A dense, symbolic exploration of obsession and humanity''s place in the world.'),
('9780060850524', '2022-08-30', 'Brave New World', 8, 'It''s been nearly a year, but the themes are unforgettable.', 'Huxley''s vision of a controlled society was unsettling yet thought-provoking.'),
('9780316769488', '2023-09-12', 'The Catcher in the Rye', 6, 'Recently finished, but not as impactful as I had hoped.', 'Holden Caulfield''s narrative is engaging but didn''t resonate with me as much as I expected.');
  3. modify pg.Client credentials inside index.js using your own postgres credential
  4. run index.js locally in your computer
