CREATE TABLE Loan (
    id serial primary key,
    name varchar,
    purchase_price numeric,
    cash_down numeric,
    tradein_value numeric,
    payoff numeric,
    private_sale numeric,
    loan_amount numeric,
    annual_interest numeric,
    loan_term numeric,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user_table(id)
)