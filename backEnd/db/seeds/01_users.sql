DELETE FROM opportunities;

DELETE FROM users;

INSERT INTO users (name, address, password,type, phone_number,email ) VALUES
( 'Kira1','fake address one', 'password1','volunteer', 416232332,'a@a.com'),
( 'Kira2','fake address 2' ,'password5', 'service provider', 32332332,'b@a.com'),
( 'Kira3', 'fake address 3','password3','volunteer',75567700,'c@a.com'),
( 'Kira4', 'fake address, 4','password4', 'service provider',667885432,'d@a.com'),
( 'Kira5', 'fake address 5','password5','volunteer', 1222121212,'e@a.com');



INSERT INTO opportunities (type, description, title, date_posted,user_id, address) VALUES
( 'science', 'volunteer1', 'title1', 'Mar, 01 2020',5,'fake address 1'),
( 'science', 'volunteer2', 'title1', 'Mar, 01 2020',4,'fake address 2'),
('science', 'volunteer3', 'title1', 'Mar, 01 2020',3,'fake address 3'),
('science', 'volunteer4', 'title1', 'Mar, 01 2020',2,'fake address 4'),
( 'science', 'volunteer5', 'title1', 'Mar, 01 2020',1,'fake address 5');
