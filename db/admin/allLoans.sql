SELECT name, loan_amount, monthly_payment, total_interest
FROM loan
INNER JOIN user_table ON loan.user_id = user_table.id