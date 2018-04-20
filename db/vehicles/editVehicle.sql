UPDATE vehicle
SET name = ${name},
    year = ${year},
    make = ${make},
    model = ${model},
    trim = ${trim},
    private_sale_value =${privateSaleValue},
    tradein_value =${tradeInValue},
    payoff =${payoff},
    user_id =${userId}
WHERE id = ${id}