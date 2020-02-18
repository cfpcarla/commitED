--Get all requests for a user
---------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- volunteer
AND user.email LIKE '%{}'--email address
---------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '${}' -- service provider
AND user.email LIKE '${}'--email address
--------------------------------------------------------
--Get all volunteer user requests by a status
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- volunteer
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  --waiting
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- volunteer
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  --accepted
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- volunteer
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  -- denied
--------------------------------------------------------
--------------------------------------------------------
--Get all service provider requests by a status
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- service provider
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  --pending
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' -- service provider
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  --accepted (then hide for stretch)
--------------------------------------------------------
SELECT * FROM  Opportunity
JOIN user ON Opportunity.user_id == user.id
JOIN requests ON Opportunity.user_id == requests.user_id
WHERE type  LIKE '%${}' --service provider
AND user.email LIKE '%{}'--email address
AND status LIKE '%{}'  -- denied (hide immediately strectch)
--------------------------------------------------------
--------------------------------------------------------
--Get all requests by a status
--------------------------------------------------------
SELECT * FROM requests
--------------------------------------------------------
---Get all voluteer requests by a status
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}' ---waiting
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}'  ---accepted
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}'  ---denied
--------------------------------------------------------
---Get all service provider requests by a status
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}' ---pending
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}'  ---accepted
--------------------------------------------------------
SELECT * FROM requests
WHERE status LIKE '%{}'  ---denied
--------------------------------------------------------
---Get all volunteer requests
--------------------------------------------------------
SELECT * FROM  requests
JOIN user ON requests.user_id == user.id
WHERE type  LIKE '%${}' -- volunteer
--------------------------------------------------------
---Get all volunteer requests
--------------------------------------------------------
SELECT * FROM  requests
JOIN user ON requests.user_id == user.id
WHERE type  LIKE '%${}' -- service provider
