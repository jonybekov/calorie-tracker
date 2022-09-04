function authRole(allowed) {
  return (req, res, next) => {
    if (req.user.role !== allowed) {
      res.status(403).send({
        message: "Not Allowed",
        code: 403,
      });
    } else {
      next();
    }
  };
}

module.exports = {
  authRole,
};
