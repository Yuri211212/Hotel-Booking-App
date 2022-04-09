import { Request, Response, Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import to from 'await-to-js';
import { APIResponse } from '../types';
import { saveHotels } from '../controllers/hotels-controller';

dotenv.config();
const router = Router();
const apiKey = process.env.API_KEY

//Router to find all hotels at some place, we expect to receive coordinates as query params
// by default Here API returns max 10 hotels
//TODO replace HERE API axios request to other place
router.get('/hotels/:coordinates', async (req: Request, res: Response): Promise<any> => {
    const coordinates = req.params.coordinates;
    const result = await axios
    .get('https://discover.search.hereapi.com/v1/discover', 
    {params: { 
        at: coordinates,
        q: 'hotels',
        limit: 10,
        apiKey
    }});

    const hotelsArray = result.data.items.map((i: APIResponse): any => {
        return {title: i.title, coordinates: `${i.position.lat},${i.position.lng}`};
    })

    return res.status(200).send(hotelsArray);
}
);

//Router to save all hotels to database, we expect to receive an array with hotels in body
router.post('/hotels', async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const [err] = await to (saveHotels(data));
    if (err) {
        return res.status(500).json({ message: 'Smth went wrong during saving hotels'})
    }
    return res.status(201).json({ message: 'Hotels saved'});
})

export default router;