'use strict';

module.exports = function(Booking) {
    /**
     * Search if a booking date for a griller exist, if does't exist the method create the booking.
     * @param {object} bookingData The data required by the Booking Model.
     * @param {Function(Error, object)} callback
     */
    Booking.createReservation = function(bookingData, callback) {
        Booking.findOrCreate({ 
            where: {
                grillerId: bookingData.grillerId,
                bookingDate: bookingData.bookingDate
            } 
        }, bookingData, (err, instance, created) => {
            if(err) {
                callback(err)
            }
            else if(!created) {
                callback({
                    name: 'Error: Reservation not valid',
                    message: 'This Griller was already reserved in this date.'
                })
            }
            else {
                callback(null, instance)
            }
        })
    };
};
