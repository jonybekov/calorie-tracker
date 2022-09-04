async function getAllUsers(req, res, next) {
  res.send({ ok: true });
}

module.exports = {
  getAllUsers,
};
