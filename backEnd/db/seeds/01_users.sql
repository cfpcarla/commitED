-- Users table seeds here (Example)
DELETE FROM opportunities;

DELETE FROM users;

INSERT INTO users (id, name, address, password,type, phone_number,email ) VALUES
(1, 'Kira1','fake address one', 'password1','volunteer', 416232332,'a@a.com'),
(2, 'Kira2','fake address 2' ,'password5', 'service provider', 32332332,'b@a.com'),
(3, 'Kira3', 'fake address 3','password3','volunteer',75567700,'c@a.com'),
(4, 'Kira4', 'fake address, 4','password4', 'service provider',667885432,'d@a.com'),
(5, 'Kira5', 'fake address 5','password5','volunteer', 1222121212,'e@a.com');



INSERT INTO opportunities (id, type, description, title, date_posted,user_id) VALUES
(1, 'science', 'volunteer1', 'title1', 'Mar, 01 2020',5),
(2, 'science', 'volunteer2', 'title1', 'Mar, 01 2020',4),
(3, 'science', 'volunteer3', 'title1', 'Mar, 01 2020',3),
(4, 'science', 'volunteer4', 'title1', 'Mar, 01 2020',2),
(5, 'science', 'volunteer5', 'title1', 'Mar, 01 2020',1);
