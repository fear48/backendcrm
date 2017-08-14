module.exports = (req, res, next) => {
  Math.random() > 0.5 ? next() : console.log("Next time");
};
