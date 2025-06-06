const cinemaService = require('../services/cinema.service');

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


exports.purchaseSpecificSeat = async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const result = await cinemaService.purchaseSpecificSeat(+cinemaId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.purchaseConsecutiveSeats = async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const result = await cinemaService.purchaseConsecutiveSeats(+cinemaId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}