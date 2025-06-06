const db = require('../models');
const { Cinema, Seat, sequelize } = db;


exports.createCinema = async (totalSeats) => {
  return await sequelize.transaction(async (t) => {
    const cinema = await Cinema.create({ totalSeats }, { transaction: t });

    const seats = Array.from({ length: totalSeats }, (_, i) => ({
      cinemaId: cinema.id,
      seatNumber: i + 1,
      isBooked: false,
    }));

    await Seat.bulkCreate(seats, { transaction: t });

    return { cinemaId: cinema.id };
  });
};

exports.purchaseSpecificSeat = async (cinemaId, seatNumber) => {
  return await sequelize.transaction(async (t) => {
    const seat = await Seat.findOne({
      where: {
        cinemaId,
        seatNumber,
        isBooked: false,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!seat) {
      throw new Error(`Seat ${seatNumber} is already booked or not available`);
    }

    seat.isBooked = true;
    await seat.save({ transaction: t });

    return { seatNumber: seat.seatNumber, message: 'Seat booked successfully' };
  });
};

exports.purchaseConsecutiveSeats = async (cinemaId) => {
  return await sequelize.transaction(async (t) => {
    const seats = await Seat.findAll({
      where: {
        cinemaId,
        isBooked: false,
      },
      order: [['seatNumber', 'ASC']],
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    for (let i = 0; i < seats.length - 1; i++) {
      const curr = seats[i];
      const next = seats[i + 1];

      if (next.seatNumber === curr.seatNumber + 1) {
        curr.isBooked = true;
        next.isBooked = true;

        await curr.save({ transaction: t });
        await next.save({ transaction: t });

        return {
          seatNumbers: [curr.seatNumber, next.seatNumber],
          message: 'Consecutive seats booked successfully',
        };
      }
    }

    throw new Error('No two consecutive free seats available');
  });
};
