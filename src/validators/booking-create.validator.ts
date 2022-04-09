import Joi from 'joi';

//Joi validator to check types and other specific parameters of incoming new booking info
const bookingCreateValidator = (data: any): Joi.ValidationResult => {
    const hotel_id = Joi.number() 
    const check_in = Joi.date();
    const check_out = Joi.date();
    const guest_name = Joi.string();
    const guest_email = Joi.string().email();
    const guest_phone = Joi.string();

    const schema = Joi.object({
    hotel_id: hotel_id.required(),
    check_in: check_in.required(),
    check_out: check_out.required(),
    guest_name: guest_name.required(),
    guest_email: guest_email.required(),
    guest_phone: guest_phone.required(),
    });

    return schema.validate(data)
};

export default bookingCreateValidator;