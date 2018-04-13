CREATE TABLE user_table (
    id serial primary key,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    address varchar NOT NULL,
    city varchar NOT NULL,
    state varchar NOT NULL,
    zip numeric NOT NULL
)