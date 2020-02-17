SELECT * FROM  Opportunity
JOIN user ON user_id == user.id
WHERE type  LIKE '%${}' -- volunteer
AND user.email LIKE '%{}'--email address
-----------------------------------------------
 SELECT * FROM  Opportunity
JOIN user ON user_id == user.id
WHERE type  LIKE '%${}' -- service provider
AND user.email LIKE '%{}'--email address
