const errorMiddleware = (err, req, res, next) => {
  res.status(400);
  res.json({ message: err.message });
};

module.exports = errorMiddleware;
