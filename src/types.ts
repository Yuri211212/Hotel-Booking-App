export type HotelsList = [
    { 
    title: string,
    coordinates: string,
    }
];

export type APIResponse = {
    title: string;
    position: {
    lat: string,
    lng: string,
    };
};

export type BookingInfo = {
    hotel_id: number,
    check_in: number,
    check_out: number,
    guest_name: string,
    guest_email: string,
    guest_phone: number,
};

export type ID = string;

