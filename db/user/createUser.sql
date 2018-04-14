INSERT INTO user_table (
    username,
    password,
    address,
    city,
    state,
    zip)
VALUES (
    ${username},
    ${password},
    ${address},
    ${city},
    ${state},
    ${zip}
)
RETURNING *
