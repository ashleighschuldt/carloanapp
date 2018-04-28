CREATE TABLE Loan (
    id serial primary key,
    name varchar,
    purchase_price varchar,
    cash_down varchar,
    tradein_value varchar,
    payoff varchar,
    private_sale varchar,
    loan_amount varchar,
    annual_interest varchar,
    loan_term varchar,
    monthly_payment varchar,
    tax_rate varchar,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user_table(id)
)