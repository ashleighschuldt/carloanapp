INSERT INTO Vehicle (
    name,
    year,
    make,
    model,
    trim,
    private_sale_value,
    tradein_value,
    payoff,
    user_id 
)
VALUES (
    ${name},
    ${year},
    ${make},
    ${model},
    ${trim},
    ${privateSaleValue},
    ${tradeInValue},
    ${payoff},
    ${userId}
)