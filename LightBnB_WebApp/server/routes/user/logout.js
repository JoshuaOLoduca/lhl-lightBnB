module.exports = function(router, database) {
    router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });
}