module.exports = function(router, database) {
  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/reservations', (req, res) => {
    const {start, end, property_id, guest_id} = req.body
    database.makeReservation(start, end, property_id, guest_id)
    .then(result => res.send('Reservation Made!'))
    .catch(err => res.status(406).send('Reservation not made: ' + err));
  });
}