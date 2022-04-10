import axios from 'axios';
import to from 'await-to-js';

import app from '../../src/app';
import db from '../../src/db/db';

describe('Test for /booking endpoint', (): void => {
    const port = 8001;
    const path = `http://localhost:${port}/booking`;

    const bookingMockData = {
        hotel_id: 1,
        check_in: "2020-04-10 20:00",
        check_out: "2020-04-11 19:20",
        guest_name: "ivan",
        guest_email: "ivan@gmail.com",
        guest_phone: "0499399999",
    };

    beforeAll(async (): Promise<void> => {
        await app.start(port);
    });

    afterAll(async (): Promise<void> => {
        await to (db.query('delete from app.booking where guest_phone = $1', [bookingMockData.guest_phone]));
        await app.stop();
    }); 

    it('Test for method POST, it should save booking to database', async (): Promise<void> => {
        await axios.post(path, bookingMockData);
        const result = await to(db.query('select * from app.booking where guest_phone = $1', [bookingMockData.guest_phone]));
        expect(result[1]?.rows[0].guest_name).toBe(bookingMockData.guest_name);
    });

    it('Test for method GET, it should return previous saved bookings from database', async (): Promise<void> => {
        const result = await axios.get(`${path}/1`);
        expect(result.status).toBe(201);
    });
});

