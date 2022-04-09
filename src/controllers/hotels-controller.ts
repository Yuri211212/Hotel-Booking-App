import { HotelsList } from "../types";

import db from "../db/db";
import dbScript from '../db/dp-scripts';

//here are controllers, which send query requests to db

export async function saveHotels (data: HotelsList): Promise<boolean> {
    //we expect to receive an array with objects, each hotel(object) will be saved to db
    data.forEach((i): any => {
        let params = [
            i.title,
            i.coordinates,
        ];
        db.query(dbScript.saveHotelList, params)
    })
    return Promise.resolve(true);
}