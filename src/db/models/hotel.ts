export default {
    createHotelTable: `
    create table if not exists app.hotel(
    hotel_name varchar not null,
    hotel_id serial primary key,
    coordinates varchar UNIQUE
    )`,

    saveHotelList: `
    insert into app.hotel (hotel_name, coordinates) 
    values ($1, $2) on conflict (coordinates) do nothing
    `,
};