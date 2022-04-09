import { NextFunction, Request, Response } from 'express';
import bookingCreateValidator from '../validators/booking-create.validator';

//this middleware sends data from body to Joi validator
export const bookingCreateMw = (req: Request, res: Response, next: NextFunction): void => {
    const payload = { ...req.body };
    const result = bookingCreateValidator(payload);
    if (result.error) {
        throw Error ('Validation is not passed')
    }
    next();
};