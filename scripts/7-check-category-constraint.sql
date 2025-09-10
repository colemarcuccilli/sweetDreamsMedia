-- Check what category constraint exists
SELECT conname, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'portfolio_projects'::regclass 
AND contype = 'c';

-- Also check if there are any existing rows to see what categories are allowed
SELECT DISTINCT category FROM portfolio_projects WHERE category IS NOT NULL;