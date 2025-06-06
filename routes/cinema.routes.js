const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller');

router.post('/', cinemaController.createCinema);
router.post('/:cinemaId/seats/:seatNumber/purchase', cinemaController.purchaseSpecificSeat);
router.post('/:cinemaId/seats/purchase-consecutive', cinemaController.purchaseConsecutiveSeats);

module.exports = router;