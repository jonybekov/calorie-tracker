const userService = require("../services/user.service");

async function auth(req, res, next) {
  const { originalUrl } = req;

  /**
   * Move static check to database
   */
  if (originalUrl === "/v1/login" || originalUrl === "/v1/register") {
    next();
    return;
  }

  const authorization = req.headers.authorization;

  if (authorization == null) {
    res.status(401).send({
      message: "Unauthorized",
      code: 401,
    });
    return;
  }

  const [bearer, token] = authorization.split(" ");
  const user = await userService.getUserByToken(token);

  if (user) {
    req.user = {
      id: user.id,
    };
    next();
  } else
    res.status(401).send({
      message: "Unauthorized",
      code: 401,
    });
}

module.exports = auth;
