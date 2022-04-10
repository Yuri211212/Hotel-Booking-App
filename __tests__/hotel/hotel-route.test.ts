import axios from 'axios';
import to from 'await-to-js';

import app from '../../src/app';
import db from '../../src/db/db';

describe('Test for /hotels endpoint', (): void => {
    const port = 8000;
    const path = `http://localhost:${port}/hotels`;
    const coordinates = '/52.5228,13.4124';
    const hotelMockData = [
            {
                title: "TestHotel1",
                coordinates: "48.1516,23.4233",
            }
    ];

    beforeAll(async (): Promise<void> => {
        await app.start(port);
    });

    afterAll(async (): Promise<void> => {
        await app.stop();
    }); 

    it('Test for method GET, it should return hotels list if it responds', async (): Promise<void> => {
        const result = await axios.get(path+coordinates);
        expect(result.data[0].title).toBe('Park Inn by Radisson Berlin Alexanderplatz');  
    });

    it('Test for method POST, it should save hotels list to database', async (): Promise<void> => {
        await axios.post(path, hotelMockData);
        const result = await to(db.query('select * from app.hotel where hotel_name = $1', [hotelMockData[0].title]));
        expect(result[1]?.rows[0]?.hotel_name).toBe(hotelMockData[0].title)
        await to (db.query('delete from app.hotel where hotel_name = $1', [hotelMockData[0].title]));
    });
});

