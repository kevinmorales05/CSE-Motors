select * from public.inventory;

SELECT * from public.inventory WHERE inv_id=1;
UPDATE public.inventory
	SET inv_make = 'Chevrolet'
	WHERE inv_id =1;
DELETE FROM public.inventory
WHERE inv_id =1;

TRUNCATE TABLE public.inventory;


--- query 1
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');
--- query 2
UPDATE public.account
	SET account_type = 'Admin'
	WHERE account_id =1;
--- query 3
DELETE FROM public.account
WHERE account_id =1;

--- query 4
UPDATE public.inventory
	SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interior with an engine to get you out of any muddy or rocky situation.'
	WHERE inv_id =10;

--- query 5
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';
--- query 6
UPDATE public.inventory
set inv_image = replace(inv_image, '/images', '/images/vehicles'); 
UPDATE public.inventory
set inv_thumbnail = replace(inv_thumbnail, '/images', '/images/vehicles');
