import { Request, Response, Router } from 'express';
import to from 'await-to-js'
import { addBooking, checkAvailability, findAllBookings } from '../controllers/booking-controller';
import { bookingCreateMw } from '../middlewares/booking.middleware';

const router = Router();

//Router to find all bookings from hotel, we expect to receive hotel_id as query params
router.get('/booking/:hotel_id', async (req: Request, res: Response):Promise<any> => {
    const hotel_id = req.params.hotel_id;
    const [findBookingsErr, findBookingsRes] = await to (findAllBookings(hotel_id));
    if (findBookingsErr) {
        return res.status(500).json({ message: 'Smth went wrong during getting bookings info'})
    }
    return res.status(201).send(findBookingsRes);
});

//Router to save new booking
router.post('/booking', bookingCreateMw, async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const availability = await checkAvailability(data);
    if (availability){
        const [err] = await to (addBooking(data));
        if (err) {
        return res.status(500).json({ message: 'Smth went wrong during saving booking'})
    }
    return res.status(201).json({ message: 'You have created booking'});
    }
    return res.status(500).json({ message: 'Sorry, there are not available numbers to this dates'})
})

export default router;