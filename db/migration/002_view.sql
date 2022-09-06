CREATE VIEW daily_total_calories AS
    SELECT SUM(f.calorie_value) daily_calories, CAST(f.consumed_at as date) AS consumed_at, u.id user_id
    FROM users AS u
            INNER JOIN foods f on u.id = f.user_id
    GROUP BY CAST(f.consumed_at as date), u.id;

CREATE VIEW monthly_total_price AS
    SELECT SUM(f.price) total_price, to_char(f.consumed_at, 'YYYY-MM') consumed_at, u.id user_id
    FROM users AS u
            INNER JOIN foods f on u.id = f.user_id
    GROUP BY to_char(f.consumed_at, 'YYYY-MM'), u.id
    ORDER BY u.id;

CREATE VIEW simple_users AS
    SELECT * from users
    WHERE role = 'USER'

CREATE VIEW simple_users_foods AS
    SELECT f.id id, f.created_at created_at, f.modified_at modified_at, name, calorie_value, consumed_at, price, user_id from foods f
    INNER JOIN simple_users u on u.id = f.user_id