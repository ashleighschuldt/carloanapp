INSERT INTO Loan (
    name,
    purchase_price,
    cash_down,
    tradein_value,
    payoff,
    private_sale,
    loan_amount,
    annual_interest,
    loan_term,
    user_id
)
VALUES (
    ${name},
    ${purchasePrice},
    ${cashDown},
    ${tradeInValue},
    ${payoff},
    ${privateSale},
    ${loanAmount},
    ${interest},
    ${payments},
    ${userId}
)