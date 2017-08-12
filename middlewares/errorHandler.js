module.exports = (err, req, res, next) => {
  const { status = 404, message = "Not Found" } = err;
  res.status(status).send({ message });
};
