module.exports = (userService) => {
  return async (req, res, next) => {
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
      next(Error("User has not access"));
      return;
    }

    const [bearer, token] = authorization.split(" ");
    const user = await userService.getUserByToken(token);

    if (user) {
      req.user = {
        id: user.id,
      };
      next();
    } else next(Error("User has not access"));
  };
};
