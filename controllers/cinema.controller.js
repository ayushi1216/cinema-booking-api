const cinemaService = require('../services/cinema.service');


//  API for cinema entry, with any number of seats. Used transactional proces. Also updating seat table with all unbooked. 
exports.createCinema = async (req, res) => {
  try {
    const result = await cinemaService.createCinema(req.body.totalSeats);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Specific Seat Booking API 
// Allows users to book a specific seat by seat number. If the seat is already booked, the API safely rejects the request with a proper error message. Database-level transactions prevent race conditions.
exports.purchaseSpecificSeat = async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const result = await cinemaService.purchaseSpecificSeat(+cinemaId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Consecutive Seat Booking
// Users can also request the first two consecutive unbooked seats. If no such pair exists, the API returns an appropriate error.
exports.purchaseConsecutiveSeats = async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const result = await cinemaService.purchaseConsecutiveSeats(+cinemaId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
