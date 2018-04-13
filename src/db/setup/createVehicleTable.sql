CREATE TABLE Vehicle (
    id serial primary key,
    name varchar,
    year numeric(4),
    make varchar,
    model varchar,
    trim varchar,
    private_sale_value numeric,
    tradein_value numeric,
    payoff numeric,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user_table(id)
)