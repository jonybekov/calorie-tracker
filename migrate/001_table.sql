CREATE TYPE roles AS ENUM ('ADMIN', 'USER');
 
CREATE TABLE IF NOT EXISTS public.users
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    modified_at  TIMESTAMP    NOT NULL DEFAULT NOW(),

    first_name   VARCHAR(40)  NOT NULL,
    last_name    VARCHAR(40),
    avatar       TEXT,
    login        VARCHAR(120) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    access_token TEXT,

    CONSTRAINT pk_users PRIMARY KEY (id)
    CONSTRAINT uq_login UNIQUE (login)
    CONSTRAINT uq_password UNIQUE (password)
    CONSTRAINT uq_access_token UNIQUE (access_token)
);

CREATE TABLE IF NOT EXISTS public.foods
(
    id            BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_at   TIMESTAMP NOT NULL DEFAULT NOW(),

    name          VARCHAR(40),
    calorie_value INTEGER            DEFAULT 0,
    consumed_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    price         REAL      NOT NULL DEFAULT 0,
    user_id       BIGINT    NOT NULL,

    CONSTRAINT pk_foods PRIMARY KEY (id),
    CONSTRAINT fk_user_food_relationship FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS public.role_relationship
(
    id          BIGINT GENERATED BY DEFAULT AS IDENTITY,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_at TIMESTAMP NOT NULL DEFAULT NOW(),

    user_id     BIGINT    NOT NULL,
    role        roles     NOT NULL DEFAULT 'USER',

    CONSTRAINT pk_role_relationship PRIMARY KEY (id),
    CONSTRAINT fk_user_role_relationship FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    CONSTRAINT uq_user_id_role UNIQUE (user_id, role)
)