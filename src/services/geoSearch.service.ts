import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY
// by default Here API returns max 10 hotels
const maxAmountOfHotels = 10;

//Service for connection to HERE API
export async function geoSearchService (coordinates: string): Promise<any> {
    const result = axios
    .get('https://discover.search.hereapi.com/v1/discover', 
    {params: { 
        at: coordinates,
        q: 'hotels',
        limit: maxAmountOfHotels,
        apiKey
    }});

    return result
};

export default geoSearchService;