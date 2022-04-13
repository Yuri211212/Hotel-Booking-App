import { BookingInfo, ID } from "../types";

import db from "../db/db";
import dbBookingModel from '../db/models/booking';

//here are controllers, which send query requests to db

export async function addBooking (data: BookingInfo): Promise<any> {
    const params: any = [
        data.hotel_id,
        data.guest_name,
        data.guest_email,
        data.guest_phone,
        data.check_in,
        data.check_out,
    ];

    const result = await db.query(dbBookingModel.saveBooking, params);
    if (!result || !result.rows || !result.rows.length) {
        return null;
    }
    return result.rows[0];
};

export async function checkAvailability (data: BookingInfo): Promise<any> {
    const params: any = [
        data.hotel_id,
        data.check_in,
        data.check_out
    ];
    const result = await db.query(dbBookingModel.checkAvailability, params);
    if(result.rows.length >= 2){
        return false;
    }
    return true;
};

export async function findAllBookings (hotel_id: ID): Promise<any> {
    const result = await db.query(dbBookingModel.findAllBookings, [hotel_id]);
    if (!result || !result.rows) return null;
    return result.rows;
};