# cinema-booking-api

This project is a scalables Cinema Ticket Booking API developed using Node.js, Express, and Sequelize (MySQL). It simulates a backend system for purchasing movie tickets with robust data consistency and multi-user safety — ideal for real-world production setups.

 Key Features:
Cinema Creation
Create a cinema with any number of seats using a transactional process. Each cinema instance is stored in the database and automatically initializes its seat layout (1 to N), all unbooked by default.

Specific Seat Booking
Allows users to book a specific seat by seat number. If the seat is already booked, the API safely rejects the request with a proper error message. Database-level transactions prevent race conditions.

Consecutive Seat Booking
Users can also request the first two consecutive unbooked seats. If no such pair exists, the API returns an appropriate error.

Concurrency & Scalability
To prevent double-booking, especially under concurrent requests from multiple users or servers, the system:
Utilizes database transactions for all booking operations


Technologies Used:
Node.js, Express – API backend
Sequelize ORM – SQL database interaction
MySQL 
Postman – API testing
