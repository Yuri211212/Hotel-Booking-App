import { HotelsList } from "../types";

import db from "../db/db";
import dbHotelModel from '../db/models/hotel';

//here are controllers, which send query requests to db

export async function saveHotels (data: HotelsList): Promise<boolean> {
    //we expect to receive an array with objects, each hotel(object) will be saved to db
    data.forEach((i): any => {
        let params = [
            i.title,
            i.coordinates,
        ];
        db.query(dbHotelModel.saveHotelList, params)
    })
    return Promise.resolve(true);
}