import { Request, Response, Router } from 'express';
import to from 'await-to-js';
import { APIResponse } from '../types';
import { saveHotels } from '../controllers/hotels-controller';
import geoSearchService from '../services/geoSearch.service';

const router = Router();

//Router to find all hotels at some place, we expect to receive coordinates as query params
router.get('/hotels/:coordinates', async (req: Request, res: Response): Promise<any> => {
    const coordinates = req.params.coordinates;
    const [geoSearchErr, geoSearchRes] = await to (geoSearchService(coordinates));
    if (geoSearchErr) {
        return res.status(500).json({ message: 'Smth went wrong during connecting to geolocation service'})
    }
    const hotelsArray = geoSearchRes.data.items.map((i: APIResponse): any => {
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