export default {
  selectExistedSchema: `select schema_name from information_schema.schemata where schema_name = 'app'`,

  createAppSchema:`create schema app`,
  
  createBookingTable:`
    create table if not exists app.booking(
    hotel_id decimal(50),
    guest_name varchar(50) not null,
    guest_email varchar(320) not null UNIQUE,
    guest_phone decimal(320) not null,
    check_in timestamp not null,
    check_out timestamp not null,
    days_amount integer GENERATED ALWAYS AS (date_part('day', check_out) - date_part('day', check_in)) STORED
    )`,

  createHotelTable:`
    create table if not exists app.hotel(
    hotel_name varchar not null,
    hotel_id serial primary key,
    coordinates varchar UNIQUE
    )`,

  saveHotelList: `
		insert into app.hotel (hotel_name, coordinates) 
		values ($1, $2) on conflict (coordinates) do nothing
    `,

  saveBooking: `
		insert into app.booking (
    hotel_id, guest_name, guest_email, guest_phone, check_in, check_out) 
    values ($1, $2, $3, $4, $5, $6)
    `,

  checkAvailability:`
    select * from app.booking 
    where hotel_id = $1 
    and DATE($2) between check_in and check_out
    and DATE($3) between check_in and check_out
    `,

  findAllBookings:`
    select * from app.booking 
    where hotel_id = $1
    `,
};
  