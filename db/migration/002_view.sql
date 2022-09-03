CREATE VIEW daily_total_price AS
SELECT SUM(f.calorie_value) daily_calories, CAST(f.consumed_at as date) AS consumed_at, u.id user_id
FROM users AS u
         INNER JOIN foods f on u.id = f.user_id
GROUP BY CAST(f.consumed_at as date), u.id;