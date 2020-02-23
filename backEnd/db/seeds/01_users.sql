DELETE FROM opportunities;

DELETE FROM users;



INSERT INTO users (name, address, password,type, phone_number,email ) VALUES
( 'Kiran Doola','1 king street west', 'password1','volunteer', 416232332,'a@a.com'),
( 'Etobicoke YMCA Employment and Immigrant Services','1530 Albion Rd' ,'password5', 'service_provider', 32332332,'b@a.com'),
( 'Beyonce', '220 Yonge St','password3','volunteer',75567700,'c@a.com'),
( 'Anisa Mohamed', '104 Portland St','password4', 'volunteer',667885432,'d@a.com'),
( 'Canadian Childrens Literacy Foundation', '620 King St W','password5','service_provider', 1222121212,'e@a.com');



INSERT INTO opportunities (type, title, description, date_posted,user_id, address, latitude, longitude) VALUES
( 'Education', 'Arabic Translator', 'Help Newcomers with day to phrases', '2020-02-01',2,'1530 Albion Rd','43.6471789', '-79.4043927'),
( 'Education', 'Childrens Book Narrarator', 'Reading Childrens Books to Children with Special needs', '2019-05-13',5,'620 King St W','43.6481789', '-79.4043927'),
('Education', 'Mandarin Translator', 'Help Newcomers with day to phrases', '2018-06-22',2,'1530 Albion Rd','43.6449789', '-79.4043927'),
('Education', 'Adults Book Narrarator', 'Reading Books to Adults with Special needs', '2019-02-01',5,'620 King St W','43.6440789', '-79.4043927'),




( 'Education', 'French Translator', 'Help Newcomers with day to phrases', '2020-01-01', 2 ,'1530 Albion Rd','43.6431789', '-79.4043927');
